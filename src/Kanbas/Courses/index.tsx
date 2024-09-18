import CoursesNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import { Navigate, Route, Routes } from "react-router";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
export default function Courses() {
  return (
    <div id="wd-courses">
        <h2>Course 1234</h2>
        <hr />
        <table>
        <tr>
            <td valign="top">
                <CoursesNavigation />
            </td>
            <td valign="top">
                <Routes>
                    <Route path="/" element={<Navigate to="1234/Home" />} />
                    <Route path="/1234/Home" element={<Home />} />
                    <Route path="/1234/Modules" element={<Modules />} />
                    <Route path="/1234/Assignments" element={<Assignments />} />
                    <Route path="/1234/Assignments/:aid" element={<AssignmentEditor />} />
                    <Route path="/1234/People" element={<h3>People</h3>} />
                </Routes>
      </td>
        </tr>
      </table>
    </div>

);}


  export {};