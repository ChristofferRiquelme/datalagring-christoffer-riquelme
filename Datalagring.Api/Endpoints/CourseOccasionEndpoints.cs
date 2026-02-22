using Datalagring.Domain.Entities;
using Datalagring.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Datalagring.Api.Endpoints;

public static class CourseOccasionEndpoints
{
    public static void MapCourseOccasionEndpoints(this WebApplication app)
    {
        app.MapGet("/courseoccasions", async (ApplicationDbContext db) =>
            await db.CourseOccasions
                    .Include(co => co.Course)
                    .Include(co => co.Teacher)
                    .ToListAsync()
        );

        app.MapGet("/courseoccasions/{id:guid}", async (Guid id, ApplicationDbContext db) =>
        {
            var occasion = await db.CourseOccasions
                                   .Include(co => co.Course)
                                   .Include(co => co.Teacher)
                                   .FirstOrDefaultAsync(co => co.Id == id);
            return occasion is not null ? Results.Ok(occasion) : Results.NotFound();
        });

        app.MapPost("/courseoccasions", async (CreateCourseOccasionRequest request, ApplicationDbContext db) =>
        {
            var occasion = new CourseOccasion(request.CourseId, request.TeacherId, request.StartDate, request.EndDate);
            db.CourseOccasions.Add(occasion);
            await db.SaveChangesAsync();
            return Results.Created($"/courseoccasions/{occasion.Id}", occasion);
        });

        app.MapPut("/courseoccasions/{id:guid}", async (Guid id, UpdateCourseOccasionRequest request, ApplicationDbContext db) =>
        {
            var occasion = await db.CourseOccasions.FindAsync(id);
            if (occasion is null) return Results.NotFound();

            // Eftersom vi har private set; vi kan antingen göra setters public eller använda en metod
            occasion = new CourseOccasion(request.CourseId, request.TeacherId, request.StartDate, request.EndDate);
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
}

// DTOs
public record CreateCourseOccasionRequest(Guid CourseId, Guid TeacherId, DateTime StartDate, DateTime EndDate);
public record UpdateCourseOccasionRequest(Guid CourseId, Guid TeacherId, DateTime StartDate, DateTime EndDate);