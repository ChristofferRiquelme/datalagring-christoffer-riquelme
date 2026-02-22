import CourseOccasionItem from "./CourseOccasionItem";
import styles from "./CourseOccasionList.module.css";

function CourseOccasionList({ occasions, onDelete, onUpdate }) {
  return (
    <ul className={styles.list}>
      {occasions.map(occasion => (
        <CourseOccasionItem
          key={occasion.id}
          occasion={occasion}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </ul>
  );
}

export default CourseOccasionList;