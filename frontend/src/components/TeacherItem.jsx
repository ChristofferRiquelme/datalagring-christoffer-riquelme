import { useState } from "react";
import styles from "./TeacherItem.module.css";

function TeacherItem({ teacher, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(teacher.firstName);
  const [lastName, setLastName] = useState(teacher.lastName);
  const [email, setEmail] = useState(teacher.email);

  const handleSave = async () => {
    await onUpdate(teacher.id, { firstName, lastName, email });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFirstName(teacher.firstName);
    setLastName(teacher.lastName);
    setEmail(teacher.email);
    setIsEditing(false);
  };

  return (
    <li className={styles.item}>
      {isEditing ? (
        <>
          <input className={styles.input} value={firstName} onChange={e => setFirstName(e.target.value)} />
          <input className={styles.input} value={lastName} onChange={e => setLastName(e.target.value)} />
          <input className={styles.input} value={email} onChange={e => setEmail(e.target.value)} />
          <button className={styles.button} onClick={handleSave}>💾</button>
          <button className={styles.button} onClick={handleCancel}>❌</button>
        </>
      ) : (
        <>
          <span>{firstName} {lastName} - {email}</span>
          <button className={styles.button} onClick={() => setIsEditing(true)}>✏️</button>
          <button className={styles.button} onClick={() => onDelete(teacher.id)}>Ta bort</button>
        </>
      )}
    </li>
  );
}

export default TeacherItem;