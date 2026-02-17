using System;

namespace Datalagring.Domain.Entities;

public class Course
{
    public Guid Id { get; private set; }
    public string Title { get; set; } = null!;
    public string Description { get; set; } = null!;

    public ICollection<CourseOccasion> CourseOccasions { get; private set; } = new List<CourseOccasion>();

    private Course() { }

    public Course(string title, string description)
    {
        Id = Guid.NewGuid();
        Title = title;
        Description = description;
    }
}
