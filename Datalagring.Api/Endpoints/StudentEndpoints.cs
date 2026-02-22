using Datalagring.Domain.Entities;
using Datalagring.Infrastructure.Persistence;
using Datalagring.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Datalagring.Api.Endpoints;

public static class StudentEndpoints
{
    public static void MapStudentEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/students");

        group.MapGet("/", async (ApplicationDbContext db) =>
        {
            return await db.Students.ToListAsync();
        });

        group.MapGet("/{id:guid}", async (Guid id, ApplicationDbContext db) =>
        {
            var student = await db.Students.FindAsync(id);
            return student is not null ? Results.Ok(student) : Results.NotFound();
        });

        group.MapPost("/", async (CreateStudentDto dto, ApplicationDbContext db) =>
        {
            var student = new Student(dto.FirstName, dto.LastName, dto.Email);

            db.Students.Add(student);
            await db.SaveChangesAsync();

            return Results.Created($"/students/{student.Id}", student);
        });

        group.MapPut("/{id:guid}", async (Guid id, UpdateStudentDto dto, ApplicationDbContext db) =>
        {
            var student = await db.Students.FindAsync(id);

            if (student is null)
                return Results.NotFound();

            student.Update(dto.FirstName, dto.LastName, dto.Email);

            await db.SaveChangesAsync();
            return Results.NoContent();
        });

        group.MapDelete("/{id:guid}", async (Guid id, ApplicationDbContext db) =>
        {
            var student = await db.Students.FindAsync(id);

            if (student is null)
                return Results.NotFound();

            db.Students.Remove(student);
            await db.SaveChangesAsync();

            return Results.NoContent();
        });
    }
}