import { useState } from "react";
import styles from "./AddCourseForm.module.css";

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
    <div className={styles.formContainer}>
      <h2>Skapa kurs</h2>

      <input
        className={styles.input}
        placeholder="Titel"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <input
        className={styles.input}
        placeholder="Beskrivning"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />

      <button
        className={styles.button}
        onClick={handleSubmit}
      >
        Lägg till
      </button>
    </div>
  );
}

export default AddCourseForm;