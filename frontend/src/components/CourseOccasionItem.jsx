import { useState } from "react";
import styles from "./CourseOccasionItem.module.css";

function CourseOccasionItem({ occasion, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [startDate, setStartDate] = useState(occasion.startDate);
  const [endDate, setEndDate] = useState(occasion.endDate);
  const [courseId, setCourseId] = useState(occasion.courseId);
  const [teacherId, setTeacherId] = useState(occasion.teacherId);

  const handleSave = async () => {
    await onUpdate(occasion.id, { startDate, endDate, courseId, teacherId });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setStartDate(occasion.startDate);
    setEndDate(occasion.endDate);
    setCourseId(occasion.courseId);
    setTeacherId(occasion.teacherId);
    setIsEditing(false);
  };

  return (
    <li className={styles.item}>
      {isEditing ? (
        <>
          <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
          <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
          <input placeholder="Course ID" value={courseId} onChange={e => setCourseId(e.target.value)} />
          <input placeholder="Teacher ID" value={teacherId} onChange={e => setTeacherId(e.target.value)} />
          <button onClick={handleSave}>💾</button>
          <button onClick={handleCancel}>❌</button>
        </>
      ) : (
        <>
          <span>{startDate} - {endDate} | Course: {courseId} | Teacher: {teacherId}</span>
          <button onClick={() => setIsEditing(true)}>✏️</button>
          <button onClick={() => onDelete(occasion.id)}>Ta bort</button>
        </>
      )}
    </li>
  );
}

export default CourseOccasionItem;