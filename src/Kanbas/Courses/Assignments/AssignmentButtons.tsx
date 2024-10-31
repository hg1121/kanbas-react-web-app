import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

interface ModulesProps {
  cid?: string; // Make cid optional
}

export default function AssignmentButtons({ cid }: ModulesProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const originalPath = location.pathname;

  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [editing, setEditing] = useState(true);

  const [newassignment, setAssignment] = useState({
    _id: new Date().getTime().toString(),
    title: "New Assignment Title",
    description: "New Assignment Description",
    course: cid,
    available: "2024-05-06T00:00",
    due: "2024-05-13T23:59",
    points: "100",
    until: "2024-05-13T23:59"
});

  const handleOnClick = () => {
    // setEditing(!editing);
    setTimeout(() => {
      navigate(`${originalPath}/${newassignment._id}`, {
        state: { newassignment, editing: false, originalPath}
      });
    }, 1000);
  }
  return (
    <div className="d-flex align-items-stretch justify-content-between p-0 my-5 assignment-header-bar">
      {/* Search Bar */}
      <div className="input-group float-start" style={{ width: "300px" }}>
        <span className="input-group-text bg-transparent border-end-0">
          <FiSearch />
        </span>
        <input
          type="text"
          className="form-control border-start-0"
          placeholder="Search..."
          aria-label="Search for Assignments"
        />
      </div>

      {/* Buttons */}
      {currentUser.role == "FACULTY" && <div>
        <button
          className="btn bg-secondary me-1 rounded-1"
        >
          <FiPlus /> Group
        </button>
        <button
          className="btn btn-assignment bg-danger text-white rounded-1"
          onClick = {handleOnClick}
        >
          <FiPlus /> Assignment
        </button>
      </div>}
      
    </div>
  );
}
