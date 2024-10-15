import { NavLink } from "react-router-dom";
import { useMatch } from "react-router";
import { useNavigate } from 'react-router-dom';
// import { useState } from 'react';

export default function CoursesNavigation() {
  const navigate = useNavigate();
  
  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];
  const match = useMatch("/Kanbas/Courses/:cid/*");
  // console.log(match);
  const cid = match?.params.cid;
  // const [selectedCourseId, setSelectedCourseId] = useState(cid);

  // console.log(cid);
  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link, index) => (
        <>
        <NavLink to={`/Kanbas/Courses/${cid}/${link}`} id="wd-course-home-link"
        className={({ isActive }) => `list-group-item border border-0 ${isActive ? "active" : "inactive"}`}
        key={index}
        > {link} </NavLink>
        <br />
        </> 
      ))}
    </div>
);}

// "list-group-item active border border-0"

// {({ isActive }) =>
//           `list-group-item text-center border-0 ${
//             isActive ? "bg-white text-danger" : "bg-black text-white "
//           }`
//         }