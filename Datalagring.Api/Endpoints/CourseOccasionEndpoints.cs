using Datalagring.Domain.Entities;
using Datalagring.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Datalagring.Api.Endpoints;

public static class CourseOccasionEndpoints
{
    public record CourseOccasionDto(
        Guid Id,
        Guid CourseId,
        string CourseTitle,
        Guid TeacherId,
        string TeacherName,
        DateTime StartDate,
        DateTime EndDate
    );

    public static void MapCourseOccasionEndpoints(this WebApplication app)
    {
        app.MapGet("/courseoccasions", async (ApplicationDbContext db) =>
        {
            var occasions = await db.CourseOccasions
                                     .Include(co => co.Course)
                                     .Include(co => co.Teacher)
                                     .ToListAsync();

            var dtos = occasions.Select(o => new CourseOccasionDto(
                o.Id,
                o.CourseId,
                o.Course.Title,
                o.TeacherId,
                $"{o.Teacher.FirstName} {o.Teacher.LastName}",
                DateTime.SpecifyKind(o.StartDate, DateTimeKind.Utc),
                DateTime.SpecifyKind(o.EndDate, DateTimeKind.Utc)
            ));

            return Results.Ok(dtos);
        });

        app.MapGet("/courseoccasions/{id:guid}", async (Guid id, ApplicationDbContext db) =>
        {
            var o = await db.CourseOccasions
                            .Include(co => co.Course)
                            .Include(co => co.Teacher)
                            .FirstOrDefaultAsync(co => co.Id == id);

            if (o is null) return Results.NotFound();

            var dto = new CourseOccasionDto(
                o.Id,
                o.CourseId,
                o.Course.Title,
                o.TeacherId,
                $"{o.Teacher.FirstName} {o.Teacher.LastName}",
                DateTime.SpecifyKind(o.StartDate, DateTimeKind.Utc),
                DateTime.SpecifyKind(o.EndDate, DateTimeKind.Utc)
            );

            return Results.Ok(dto);
        });

        app.MapPost("/courseoccasions", async (CreateCourseOccasionRequest request, ApplicationDbContext db) =>
        {
            var utcStart = DateTime.SpecifyKind(request.StartDate, DateTimeKind.Utc);
            var utcEnd = DateTime.SpecifyKind(request.EndDate, DateTimeKind.Utc);

            var occasion = new CourseOccasion(request.CourseId, request.TeacherId, utcStart, utcEnd);

            db.CourseOccasions.Add(occasion);
            await db.SaveChangesAsync();

            var dto = new CourseOccasionDto(
                occasion.Id,
                occasion.CourseId,
                (await db.Courses.FindAsync(occasion.CourseId))?.Title ?? "",
                occasion.TeacherId,
                (await db.Teachers.FindAsync(occasion.TeacherId)) is Teacher t ? $"{t.FirstName} {t.LastName}" : "",
                occasion.StartDate,
                occasion.EndDate
            );

            return Results.Created($"/courseoccasions/{occasion.Id}", dto);
        });

        app.MapPut("/courseoccasions/{id:guid}", async (Guid id, UpdateCourseOccasionRequest request, ApplicationDbContext db) =>
        {
            var occasion = await db.CourseOccasions.FindAsync(id);
            if (occasion is null) return Results.NotFound();

            // Uppdatera med UTC-datum
            occasion = new CourseOccasion(
                request.CourseId,
                request.TeacherId,
                DateTime.SpecifyKind(request.StartDate, DateTimeKind.Utc),
                DateTime.SpecifyKind(request.EndDate, DateTimeKind.Utc)
            );

            db.Entry(occasion).Property("Id").CurrentValue = id;

            db.CourseOccasions.Update(occasion);
            await db.SaveChangesAsync();
            return Results.NoContent();
        });

        app.MapDelete("/courseoccasions/{id:guid}", async (Guid id, ApplicationDbContext db) =>
        {
            var occasion = await db.CourseOccasions.FindAsync(id);
            if (occasion is null) return Results.NotFound();

            db.CourseOccasions.Remove(occasion);
            await db.SaveChangesAsync();
            return Results.NoContent();
        });
    }

    public record CreateCourseOccasionRequest(Guid CourseId, Guid TeacherId, DateTime StartDate, DateTime EndDate);
    public record UpdateCourseOccasionRequest(Guid CourseId, Guid TeacherId, DateTime StartDate, DateTime EndDate);
}