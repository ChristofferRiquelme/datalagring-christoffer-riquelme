using System;

namespace Datalagring.Domain.Entities;

public class Student
{
    public Guid Id { get; private set; }
    public string FirstName { get; private set; } = null!;
    public string LastName { get; private set; } = null!;
    public string Email { get; private set; } = null!;

    public ICollection<Enrollment> Enrollments { get; private set; } = new List<Enrollment>();

    private Student() { }

    public Student(string firstName, string lastName, string email)
    {
        Id = Guid.NewGuid();
        FirstName = firstName;
        LastName = lastName;
        Email = email;
    }

    public void Update(string firstName, string lastName, string email)
{
    FirstName = firstName;
    LastName = lastName;
    Email = email;
}
}
