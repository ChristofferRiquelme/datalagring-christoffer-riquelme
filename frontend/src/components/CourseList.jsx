import CourseItem from "./CourseItem";
import styles from "./CourseList.module.css";

function CourseList({ courses, onDelete, onUpdate }) {
  return (
    <ul className={styles.list}>
      {courses.map(course => (
        <CourseItem
          key={course.id}
          course={course}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </ul>
  );
}

export default CourseList;