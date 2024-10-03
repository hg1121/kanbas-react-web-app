import CoursesNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import { Navigate, Route, Routes } from "react-router";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import PeopleTable from "./People/Table";
export default function Courses() {
  return (
    <div id="wd-courses">
      <h2>Course 1234</h2>
      <hr />
      <div className="d-flex">
        <div className="d-none d-md-block">
          <CoursesNavigation />
        </div>
        <div className="flex-fill">
          <Routes>
            <Route path="/" element={<Navigate to="1234/Home" />} />
            <Route path="/1234/Home" element={<Home />} />
            <Route path="/1234/Modules" element={<Modules />} />
            <Route path="/1234/Assignments" element={<Assignments />} />
            <Route
              path="/1234/Assignments/:aid"
              element={<AssignmentEditor />}
            />
            <Route path="/1234/People" element={<PeopleTable />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export {};
