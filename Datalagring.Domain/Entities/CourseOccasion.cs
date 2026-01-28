using System;

namespace Datalagring.Domain.Entities;

public class CourseOccasion
{
    public Guid Id { get; private set; }

    public Guid CourseId { get; private set; }
    public Course Course { get; private set; } = null!;

    public Guid TeacherId { get; private set; }
    public Teacher Teacher { get; private set; } = null!;

    public DateTime StartDate { get; private set; }
    public DateTime EndDate { get; private set; }

    public ICollection<Enrollment> Enrollments { get; private set; } = new List<Enrollment>();

    private CourseOccasion() { }

    public CourseOccasion(Guid courseId, Guid teacherId, DateTime startDate, DateTime endDate)
    {
        Id = Guid.NewGuid();
        CourseId = courseId;
        TeacherId = teacherId;
        StartDate = startDate;
        EndDate = endDate;
    }
}
