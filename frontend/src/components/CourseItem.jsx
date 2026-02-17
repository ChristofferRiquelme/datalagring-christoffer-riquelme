import styles from "./CourseItem.module.css";

function CourseItem({ course, onDelete }) {
  return (
    <li className={styles.item}>
      <span>
        {course.title} - {course.description}
      </span>

      <button
        className={styles.deleteButton}
        onClick={() => onDelete(course.id)}
      >
        Ta bort
      </button>
    </li>
  );
}

export default CourseItem;