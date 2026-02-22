import TeacherItem from "./TeacherItem";
import styles from "./TeacherList.module.css";

function TeacherList({ teachers, onDelete, onUpdate }) {
  return (
    <ul className={styles.list}>
      {teachers.map(teacher => (
        <TeacherItem
          key={teacher.id}
          teacher={teacher}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </ul>
  );
}

export default TeacherList;