import { useEffect, useState } from "react";
import CourseList from "./components/CourseList";
import AddCourseForm from "./components/AddCourseForm";

function App() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5004/courses")
      .then(res => res.json())
      .then(data => setCourses(data));
  }, []);

  const addCourse = async (course) => {
    const response = await fetch("http://localhost:5004/courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(course)
    });

    const newCourse = await response.json();
    setCourses(prev => [...prev, newCourse]);
  };

  const deleteCourse = async (id) => {
    const response = await fetch(`http://localhost:5004/courses/${id}`, {
      method: "DELETE"
    });

    if (response.ok) {
      setCourses(prev => prev.filter(course => course.id !== id));
    }
  };

  return (
    <div>
      <h1>Kurser</h1>

      <CourseList
        courses={courses}
        onDelete={deleteCourse}
      />

      <AddCourseForm
        onAdd={addCourse}
      />
    </div>
  );
}

export default App;