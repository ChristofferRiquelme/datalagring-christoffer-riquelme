import { useEffect, useState } from "react";
import CourseList from "./components/CourseList";
import AddCourseForm from "./components/AddCourseForm";
import CourseOccasionList from "./components/CourseOccasionList";
import AddCourseOccasionForm from "./components/AddCourseOccasionForm";
import TeacherList from "./components/TeacherList";
import AddTeacherForm from "./components/AddTeacherForm";
import StudentList from "./components/StudentList";
import AddStudentForm from "./components/AddStudentForm";
import styles from "./App.module.css";

function App() {
  const [activeTab, setActiveTab] = useState("courses"); // "courses", "occasions", "teachers", "students"

  // ------------------- Courses -------------------
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5004/courses")
      .then(res => res.json())
      .then(data => setCourses(data));
  }, []);

  const addCourse = async (course) => {
    const response = await fetch("http://localhost:5004/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(course)
    });
    const newCourse = await response.json();
    setCourses(prev => [...prev, newCourse]);
  };

  const updateCourse = async (id, updatedCourse) => {
    const response = await fetch(`http://localhost:5004/courses/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Title: updatedCourse.title, Description: updatedCourse.description })
    });
    if (response.ok) setCourses(prev => prev.map(c => (c.id === id ? { ...c, ...updatedCourse } : c)));
  };

  const deleteCourse = async (id) => {
    const response = await fetch(`http://localhost:5004/courses/${id}`, { method: "DELETE" });
    if (response.ok) setCourses(prev => prev.filter(c => c.id !== id));
  };

  // ------------------- CourseOccasions -------------------
  const [occasions, setOccasions] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5004/courseoccasions")
      .then(res => res.json())
      .then(data => setOccasions(data));
  }, []);

  const addOccasion = async (occasion) => {
    const response = await fetch("http://localhost:5004/courseoccasions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(occasion)
    });
    const newOccasion = await response.json();
    setOccasions(prev => [...prev, newOccasion]);
  };

  const updateOccasion = async (id, updatedOccasion) => {
    const response = await fetch(`http://localhost:5004/courseoccasions/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedOccasion)
    });
    if (response.ok) setOccasions(prev => prev.map(o => (o.id === id ? { ...o, ...updatedOccasion } : o)));
  };

  const deleteOccasion = async (id) => {
    const response = await fetch(`http://localhost:5004/courseoccasions/${id}`, { method: "DELETE" });
    if (response.ok) setOccasions(prev => prev.filter(o => o.id !== id));
  };

  // ------------------- Teachers -------------------
  const [teachers, setTeachers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5004/teachers")
      .then(res => res.json())
      .then(data => setTeachers(data));
  }, []);

  const addTeacher = async (teacher) => {
    const response = await fetch("http://localhost:5004/teachers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(teacher)
    });
    const newTeacher = await response.json();
    setTeachers(prev => [...prev, newTeacher]);
  };

  const updateTeacher = async (id, updatedTeacher) => {
    const response = await fetch(`http://localhost:5004/teachers/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTeacher)
    });
    if (response.ok) setTeachers(prev => prev.map(t => (t.id === id ? { ...t, ...updatedTeacher } : t)));
  };

  const deleteTeacher = async (id) => {
    const response = await fetch(`http://localhost:5004/teachers/${id}`, { method: "DELETE" });
    if (response.ok) setTeachers(prev => prev.filter(t => t.id !== id));
  };

  // ------------------- Students -------------------
  const [students, setStudents] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5004/students")
      .then(res => res.json())
      .then(data => setStudents(data));
  }, []);

  const addStudent = async (student) => {
    const response = await fetch("http://localhost:5004/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student)
    });
    const newStudent = await response.json();
    setStudents(prev => [...prev, newStudent]);
  };

  const updateStudent = async (id, updatedStudent) => {
    const response = await fetch(`http://localhost:5004/students/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedStudent)
    });
    if (response.ok) setStudents(prev => prev.map(s => (s.id === id ? { ...s, ...updatedStudent } : s)));
  };

  const deleteStudent = async (id) => {
    const response = await fetch(`http://localhost:5004/students/${id}`, { method: "DELETE" });
    if (response.ok) setStudents(prev => prev.filter(s => s.id !== id));
  };

  // ------------------- Render -------------------
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>📚 Skolsystem</h1>

        {/* Tabs */}
        <div className={styles.tabs}>
          <button
            className={activeTab === "courses" ? styles.activeTab : ""}
            onClick={() => setActiveTab("courses")}
          >
            Kurser
          </button>
          <button
            className={activeTab === "occasions" ? styles.activeTab : ""}
            onClick={() => setActiveTab("occasions")}
          >
            Kurstillfällen
          </button>
          <button
            className={activeTab === "teachers" ? styles.activeTab : ""}
            onClick={() => setActiveTab("teachers")}
          >
            Lärare
          </button>
          <button
            className={activeTab === "students" ? styles.activeTab : ""}
            onClick={() => setActiveTab("students")}
          >
            Studenter
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "courses" && (
          <>
            <CourseList courses={courses} onDelete={deleteCourse} onUpdate={updateCourse} />
            <AddCourseForm onAdd={addCourse} />
          </>
        )}

        {activeTab === "occasions" && (
          <>
            <CourseOccasionList occasions={occasions} onDelete={deleteOccasion} onUpdate={updateOccasion} />
            <AddCourseOccasionForm onAdd={addOccasion} />
          </>
        )}

        {activeTab === "teachers" && (
          <>
            <TeacherList teachers={teachers} onDelete={deleteTeacher} onUpdate={updateTeacher} />
            <AddTeacherForm onAdd={addTeacher} />
          </>
        )}

        {activeTab === "students" && (
          <>
            <StudentList students={students} onDelete={deleteStudent} onUpdate={updateStudent} />
            <AddStudentForm onAdd={addStudent} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;