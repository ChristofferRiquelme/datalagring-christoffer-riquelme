using System.Net;
using System.Net.Http.Json;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc.Testing;
using Xunit;

namespace Datalagring.Tests;

public class CourseEndpointsTests 
    : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly HttpClient _client;

    public CourseEndpointsTests(WebApplicationFactory<Program> factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task PostCourse_ShouldReturnCreated()
    {
        // Arrange
        var newCourse = new
        {
            Title = "Test Course",
            Description = "Test Description"
        };

        // Act
        var response = await _client.PostAsJsonAsync("/courses", newCourse);

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.Created);
    }
}