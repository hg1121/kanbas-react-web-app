import AssignmentButtons from "./AssignmentButtons";
import { BsGripVertical } from "react-icons/bs";
import { FaCaretDown } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { FiPlus } from "react-icons/fi";
import { GiNotebook } from "react-icons/gi";
import LessonControlButtons from "../Modules/LessonControlButtons";
import * as db from "../../Database";
import { useMatch } from "react-router";
import { Link } from "react-router-dom";

export default function Assignments() {
  const assignments = db.assignments;
  const match = useMatch("/Kanbas/Courses/:cid/Assignments");
  const cid = match?.params.cid;
  // console.log(cid);

  return (
    <div id="wd-assignments">
      <AssignmentButtons />
      <ul id="wd-modules" className="list-group rounded-0 d-flex flex-column">
      <li className="wd-title p-4 ps-2 bg-secondary d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <BsGripVertical className="me-1 fs-3" />
            <FaCaretDown className="me-1 fs-4" />
            <span style={{ fontSize: "24px", fontWeight: "bold" }}>
              ASSIGNMENTS
            </span>
          </div>
          <div className="d-flex align-items-center">
            <span
              style={{
                border: "1px solid black",
                borderColor: "grey",
                borderRadius: "20px",
                padding: "2px 4px",
                fontSize: "20px",
              }}
            >
              40% of Total
            </span>
            <FiPlus className="mx-2" />
            <IoEllipsisVertical />
          </div>
        </li>
        {assignments
        .filter((assignment: any) => assignment.course === cid)
        .map((assignment: any, index: any) => (
          <li className="wd-module list-group-item p-3 fs-5 border-gray d-flex justify-content-between align-items-center">
          <span className="d-flex align-items-center">
            <BsGripVertical className="me-2 fs-3" />
            <GiNotebook className="me-2 fs-3 text-green" />
            <span>
            <h4><a href={`#/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}className="no-decoration"> {assignment.title}</a></h4>
              <span className="text-danger">Multiple Modules</span> |{" "}
              <b>Not available until </b>{assignment.available} | <br />
              <b>Due </b>{assignment.due} | {assignment.points} pts
            </span>
          </span>
          <LessonControlButtons />
        </li>
        ))}
      </ul>
    </div>
  );
}
