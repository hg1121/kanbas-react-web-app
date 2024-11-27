import { courses } from "../Database";
import { FaAlignJustify } from "react-icons/fa6";
import CoursesNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Quizzes from "./Quizzes";

import { Navigate, Route, Routes, useLocation } from "react-router";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import PeopleTable from "./People/Table";
import QuizEditor from "./Quizzes/QuizDetail";

export default function Courses({ courses }: { courses: any[]; }) {
  const location = useLocation();
  const pathSegments = location.pathname.split('/'); // Split path by "/"
  const cid = pathSegments[3];
  const wildcard = pathSegments[4]
  let course = courses.find((course: { _id: string | object; }) => course._id === cid);
  // console.log(cid);

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
              element={<AssignmentEditor />}
            />
            <Route path={`/${course._id}/Quizzes`} element={<Quizzes />} />
            <Route
              path={`/${course._id}/Quizzes/:qid`}
              element={<QuizEditor />}
            />
            <Route path={`/${course._id}/People`} element={<PeopleTable />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export {};
