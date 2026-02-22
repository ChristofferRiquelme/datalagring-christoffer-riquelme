import { useState } from "react";
import styles from "./StudentItem.module.css";

function StudentItem({ student, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(student.firstName);
  const [lastName, setLastName] = useState(student.lastName);
  const [email, setEmail] = useState(student.email);

  const handleSave = async () => {
    await onUpdate(student.id, { firstName, lastName, email });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFirstName(student.firstName);
    setLastName(student.lastName);
    setEmail(student.email);
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
          <button className={styles.button} onClick={() => onDelete(student.id)}>Ta bort</button>
        </>
      )}
    </li>
  );
}

export default StudentItem;