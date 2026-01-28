using System;

namespace Datalagring.Domain.Entities;

public class Course
{
    public Guid Id { get; private set; }
    public string Title { get; private set; } = null!;
    public string Description { get; private set; } = null!;

    public ICollection<CourseOccasion> CourseOccasions { get; private set; } = new List<CourseOccasion>();

    private Course() { }

    public Course(string title, string description)
    {
        Id = Guid.NewGuid();
        Title = title;
        Description = description;
    }
}
