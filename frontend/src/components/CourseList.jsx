import CourseItem from "./CourseItem";

function CourseList({ courses, onDelete }) {
  return (
    <ul>
      {courses.map(course => (
        <CourseItem
          key={course.id}
          course={course}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default CourseList;