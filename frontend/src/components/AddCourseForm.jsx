import { useState } from "react";

function AddCourseForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (!title.trim()) return;

    onAdd({ title, description });

    setTitle("");
    setDescription("");
  };

  return (
    <div>
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

      <button onClick={handleSubmit}>
        Lägg till
      </button>
    </div>
  );
}

export default AddCourseForm;