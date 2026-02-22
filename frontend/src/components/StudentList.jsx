import StudentItem from "./StudentItem";
import styles from "./StudentList.module.css";

function StudentList({ students, onDelete, onUpdate }) {
  return (
    <ul className={styles.list}>
      {students.map(student => (
        <StudentItem
          key={student.id}
          student={student}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </ul>
  );
}

export default StudentList;