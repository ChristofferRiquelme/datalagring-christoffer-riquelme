function CourseItem({ course, onDelete }) {
  return (
    <li>
      {course.title} - {course.description}
      <button onClick={() => onDelete(course.id)}>
        ❌
      </button>
    </li>
  );
}

export default CourseItem;