import { useEffect, useState } from "react";

function App() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5004/courses")
      .then(res => res.json())
      .then(data => setCourses(data));
  }, []);

  return (
    <div>
      <h1>Kurser</h1>
      <ul>
        {courses.map(course => (
          <li key={course.id}>
            {course.title} - {course.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;