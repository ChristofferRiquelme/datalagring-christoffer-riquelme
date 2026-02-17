using Datalagring.Domain.Entities;
using Datalagring.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Datalagring.Api.Endpoints;

public static class CourseEndpoints
{
    public static void MapCourseEndpoints(this WebApplication app)
    {
        app.MapGet("/courses", async (ApplicationDbContext db) =>
        {
            return await db.Courses.ToListAsync();
        });

        app.MapGet("/courses/{id:guid}", async (Guid id, ApplicationDbContext db) =>
        {
            var course = await db.Courses.FindAsync(id);
            return course is not null ? Results.Ok(course) : Results.NotFound();
        });

        app.MapPost("/courses", async (CreateCourseRequest request, ApplicationDbContext db) =>
        {
            var course = new Course(request.Title, request.Description);
            db.Courses.Add(course);
            await db.SaveChangesAsync();

            return Results.Created($"/courses/{course.Id}", course);
        });

        app.MapPut("/courses/{id:guid}", async (Guid id, UpdateCourseRequest request, ApplicationDbContext db) =>
        {
            var course = await db.Courses.FindAsync(id);

            if (course is null)
                return Results.NotFound();

            course.Title = request.Title;
            course.Description = request.Description;

            await db.SaveChangesAsync();

            return Results.NoContent();
        });

        app.MapDelete("/courses/{id}", async (Guid id, ApplicationDbContext db) =>
{
            var course = await db.Courses.FindAsync(id);

            if (course is null)
                return Results.NotFound();

            db.Courses.Remove(course);
            await db.SaveChangesAsync();

            return Results.NoContent();
        });
    }
}

public record CreateCourseRequest(string Title, string Description);

public record UpdateCourseRequest(string Title, string Description);