using Datalagring.Domain.Entities;
using Datalagring.Infrastructure.Persistence;
using Datalagring.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Datalagring.Api.Endpoints;

public static class TeacherEndpoints
{
    public static void MapTeacherEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/teachers");

        group.MapGet("/", async (ApplicationDbContext db) =>
        {
            return await db.Teachers.ToListAsync();
        });

        group.MapGet("/{id:guid}", async (Guid id, ApplicationDbContext db) =>
        {
            var teacher = await db.Teachers.FindAsync(id);
            return teacher is not null ? Results.Ok(teacher) : Results.NotFound();
        });

        group.MapPost("/", async (CreateTeacherDto dto, ApplicationDbContext db) =>
        {
            var teacher = new Teacher(dto.FirstName, dto.LastName, dto.Email);

            db.Teachers.Add(teacher);
            await db.SaveChangesAsync();

            return Results.Created($"/teachers/{teacher.Id}", teacher);
        });

        group.MapPut("/{id:guid}", async (Guid id, UpdateTeacherDto dto, ApplicationDbContext db) =>
        {
            var teacher = await db.Teachers.FindAsync(id);

            if (teacher is null)
                return Results.NotFound();

            teacher.Update(dto.FirstName, dto.LastName, dto.Email);

            await db.SaveChangesAsync();
            return Results.NoContent();
        });

        group.MapDelete("/{id:guid}", async (Guid id, ApplicationDbContext db) =>
        {
            var teacher = await db.Teachers.FindAsync(id);

            if (teacher is null)
                return Results.NotFound();

            db.Teachers.Remove(teacher);
            await db.SaveChangesAsync();

            return Results.NoContent();
        });
    }
}