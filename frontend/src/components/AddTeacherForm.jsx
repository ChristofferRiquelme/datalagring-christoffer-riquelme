import { useState } from "react";
import styles from "./AddTeacherForm.module.css";

function AddTeacherForm({ onAdd }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    if (!firstName.trim() || !lastName.trim() || !email.trim()) return;

    onAdd({ firstName, lastName, email });

    setFirstName("");
    setLastName("");
    setEmail("");
  };

  return (
    <div className={styles.formContainer}>
      <h2>Skapa Lärare</h2>
      <input className={styles.input} placeholder="Förnamn" value={firstName} onChange={e => setFirstName(e.target.value)} />
      <input className={styles.input} placeholder="Efternamn" value={lastName} onChange={e => setLastName(e.target.value)} />
      <input className={styles.input} placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <button className={styles.button} onClick={handleSubmit}>Lägg till</button>
    </div>
  );
}

export default AddTeacherForm;