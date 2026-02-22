import { useState } from "react";
import styles from "./AddCourseOccasionForm.module.css";

function AddCourseOccasionForm({ onAdd }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [courseId, setCourseId] = useState("");
  const [teacherId, setTeacherId] = useState("");

  const handleSubmit = () => {
    if (!startDate || !endDate || !courseId || !teacherId) return;

    onAdd({ startDate, endDate, courseId, teacherId });

    setStartDate("");
    setEndDate("");
    setCourseId("");
    setTeacherId("");
  };

  return (
    <div className={styles.formContainer}>
      <h2>Skapa kurstillfälle</h2>
      <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
      <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
      <input placeholder="Course ID" value={courseId} onChange={e => setCourseId(e.target.value)} />
      <input placeholder="Teacher ID" value={teacherId} onChange={e => setTeacherId(e.target.value)} />
      <button onClick={handleSubmit}>Lägg till</button>
    </div>
  );
}

export default AddCourseOccasionForm;