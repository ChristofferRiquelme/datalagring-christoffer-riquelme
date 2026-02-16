import { useEffect, useState } from "react";

function App() {

  const [courses, setCourses] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetch("http://localhost:5004/courses")
      .then(res => res.json())
      .then(data => setCourses(data));
  }, []);

const addCourse = async () => {
  const response = await fetch("http://localhost:5004/courses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title: title,
      description: description
    })
  });

  const newCourse = await response.json();

  setCourses(prev => [...prev, newCourse]);

  setTitle("");
  setDescription("");
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

    <ul>
      {courses.map(course => (
        <li key={course.id}>
          {course.title} - {course.description}

          <button onClick={() => deleteCourse(course.id)}>
            ❌ Ta bort
          </button>
        </li>
      ))}
    </ul>

      <h2>Skapa kurs</h2>

      <input
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <input
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />

      <button onClick={addCourse}>
        Lägg till
      </button>
    </div>
  );
}

export default App;