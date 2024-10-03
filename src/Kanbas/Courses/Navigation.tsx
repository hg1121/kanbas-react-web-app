import { NavLink } from "react-router-dom";
export default function CoursesNavigation() {
  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      <NavLink to="/Kanbas/Courses/1234/Home" id="wd-course-home-link"
        className={({ isActive }) => `list-group-item border border-0 ${isActive ? "active" : "inactive"}`}> Home </NavLink><br />
      <NavLink to="/Kanbas/Courses/1234/Modules" id="wd-course-modules-link"
        className={({ isActive }) => `list-group-item border border-0 ${isActive ? "active" : "inactive"}`}> Modules </NavLink><br />
      <NavLink to="/Kanbas/Courses/1234/Piazza" id="wd-course-piazza-link"
        className={({ isActive }) => `list-group-item border border-0 ${isActive ? "active" : "inactive"}`}> Piazza </NavLink><br />
      <NavLink to="/Kanbas/Courses/1234/Zoom" id="wd-course-zoom-link"
        className={({ isActive }) => `list-group-item border border-0 ${isActive ? "active" : "inactive"}`}> Zoom </NavLink><br />
      <NavLink to="/Kanbas/Courses/1234/Assignments" id="wd-course-quizzes-link"
        className={({ isActive }) => `list-group-item border border-0 ${isActive ? "active" : "inactive"}`}> Assignments </NavLink><br />
      <NavLink to="/Kanbas/Courses/1234/Quizzes" id="wd-course-assignments-link"
        className={({ isActive }) => `list-group-item border border-0 ${isActive ? "active" : "inactive"}`}> Quizzes </NavLink><br />
      <NavLink to="/Kanbas/Courses/1234/People" id="wd-course-people-link"
        className={({ isActive }) => `list-group-item border border-0 ${isActive ? "active" : "inactive"}`} > People </NavLink><br />
    </div>
);}

// "list-group-item active border border-0"

// {({ isActive }) =>
//           `list-group-item text-center border-0 ${
//             isActive ? "bg-white text-danger" : "bg-black text-white "
//           }`
//         }