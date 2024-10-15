import { courses } from "../Database";
import { FaAlignJustify } from "react-icons/fa6";
import CoursesNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import { Navigate, Route, Routes, useMatch } from "react-router";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import PeopleTable from "./People/Table";
export default function Courses() {
  const match = useMatch("/Kanbas/Courses/:cid/*");
  const cid = match?.params.cid;
  const wildcard = match?.params['*']; 
  // console.log(wildcard);
  // console.log("MenuStandalone", match?.params);
  // console.log("Extracted cid from URL:", cid);
  let course = courses.find((course: { _id: string | object; }) => course._id === cid);
  // console.log(cid);

  // If course is undefined, give a defult one
  if (!course) {
    course = courses[0]
  }

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course && (course.name + " > " + wildcard) }
      </h2>
      <hr />
      <div className="d-flex">
        <div className="d-none d-md-block">
          <CoursesNavigation />
        </div>
        <div className="flex-fill">
          <Routes>
            <Route path="/" element={<Navigate to={`${course._id}/Home`} />} />
            <Route path={`/${course._id}/Home`} element={<Home />} />
            <Route path={`/${course._id}/Modules`} element={<Modules />} />
            <Route path={`/${course._id}/Assignments`} element={<Assignments />} />
            <Route
              path={`/${course._id}/Assignments/:aid`}
              element={<AssignmentEditor cid={course._id}/>}
            />
            <Route path={`/${course._id}/People`} element={<PeopleTable />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export {};
