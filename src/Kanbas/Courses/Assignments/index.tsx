import AssignmentButtons from "./AssignmentButtons";
import { BsGripVertical } from "react-icons/bs";
import { FaCaretDown } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { FiPlus } from "react-icons/fi";
import { GiNotebook } from "react-icons/gi";
import LessonControlButtons from "../Modules/LessonControlButtons";
import * as db from "../../Database";
import { useLocation } from "react-router";
import { useSelector} from "react-redux";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa6";

import { useEffect, useState } from "react";
import MyModal from "./MyModal";
import * as CourseClient from "../client"

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: '2-digit', 
    day: '2-digit', 
    hour: '2-digit', 
    minute: '2-digit', 
    hour12: false 
  };
  return date.toLocaleString('en-US', options).replace(',', '');
};

export default function Assignments() {
  const location = useLocation();
  const pathSegments = location.pathname.split('/'); // Split path by "/"
  const cid = pathSegments[3];
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const [assignments, setAssignments] = useState<any[]>([]);

  const fetchAllAssignments = async(cid: string) => {
    let assignments = [];
    try{
      assignments = await CourseClient.fetchAssignments(cid);
    }catch(error){
      console.error(error);
    }
    setAssignments(assignments);
  }

  const [modalOpen, setModalOpen] = useState(false);
  const [deleteAid, setDeleteAid] = useState("");
  const handleDelete = (aid: any) => {
    setDeleteAid(aid);
    setModalOpen(!modalOpen);
    setTimeout(() => {
      setModalOpen(true);;
    }, 100);
    
  }

  useEffect(() => {
    // console.log('Updated Assignments:', assignments);
    fetchAllAssignments(cid);
  }, []);

  return (
    <div id="wd-assignments">
      <AssignmentButtons cid={cid}/>
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
          <li className="wd-module list-group-item p-3 fs-5 border-gray d-flex justify-content-between align-items-center" key ={index}>
          <span className="d-flex align-items-center">
            <BsGripVertical className="me-2 fs-3" />
            <GiNotebook className="me-2 fs-3 text-green" />
            <span>
            <h4>
              {currentUser.role === "FACULTY" ? 
               <Link to={`/Kanbas/Courses/${cid}/Assignments/${assignment._id}`} state={{ newassignment: assignment, editing: true }}className="no-decoration"> {assignment.title}</Link>
              : assignment.title}
              </h4>
              <span className="text-danger">Multiple Modules</span> |{" "}
              <b>Not available until </b>{formatDate(assignment.available)} | <br />
              <b>Due </b>{formatDate(assignment.due)} | {assignment.points} pts
            </span>
          </span>
          <div>
          {currentUser.role === "FACULTY" && <FaTrash className="text-danger me-2 mb-1" onClick={() => {handleDelete(assignment._id)}}/>}
          <LessonControlButtons />
          </div>
        </li>
        ))}
      </ul>
    {modalOpen && <MyModal modalOpen = {modalOpen} aid={deleteAid} cid={cid} assignments = {assignments} setAssignments = {setAssignments}/>}
    </div>
  );
}
