using System;

namespace Datalagring.Domain.Entities;

public class Enrollment
{
    public Guid Id { get; private set; }

    public Guid StudentId { get; private set; }
    public Student Student { get; private set; } = null!;

    public Guid CourseOccasionId { get; private set; }
    public CourseOccasion CourseOccasion { get; private set; } = null!;

    public DateTime RegisteredAt { get; private set; }

    private Enrollment() { }

    public Enrollment(Guid studentId, Guid courseOccasionId)
    {
        Id = Guid.NewGuid();
        StudentId = studentId;
        CourseOccasionId = courseOccasionId;
        RegisteredAt = DateTime.UtcNow;
    }
}
