import { useState } from "react";
import styles from "./CourseItem.module.css";

function CourseItem({ course, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(course.title);
  const [description, setDescription] = useState(course.description);

  const handleSave = async () => {
    await onUpdate(course.id, { title, description });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTitle(course.title);
    setDescription(course.description);
    setIsEditing(false);
  };

  return (
    <li className={styles.item}>
      {isEditing ? (
        <>
          <input
            className={styles.input}
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <input
            className={styles.input}
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <button className={styles.button} onClick={handleSave}>💾</button>
          <button className={styles.button} onClick={handleCancel}>❌</button>
        </>
      ) : (
        <>
          <span>{course.title} - {course.description}</span>
          <button className={styles.button} onClick={() => setIsEditing(true)}>✏️</button>
          <button className={styles.button} onClick={() => onDelete(course.id)}>Ta bort</button>
        </>
      )}
    </li>
  );
}

export default CourseItem;