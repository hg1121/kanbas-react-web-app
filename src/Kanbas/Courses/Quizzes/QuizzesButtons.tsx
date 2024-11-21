import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";
import { IoEllipsisVertical } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

export default function QuizzesButtons() {
  const location = useLocation();
  const pathSegments = location.pathname.split("/"); // Split path by "/"
  const cid = pathSegments[3];

  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [addQuiz, setAddQuiz] = useState(false);

  const handleOnClick = () => {
    setAddQuiz(!addQuiz);
  };
  return (
    <>
    <div className="d-flex align-items-stretch justify-content-between p-0 my-2 assignment-header-bar">
      {/* Search Bar */}
      <div className="input-group float-start" style={{ width: "300px" }}>
        <span className="input-group-text bg-transparent border-end-0">
          <FiSearch />
        </span>
        <input
          type="text"
          className="form-control border-start-0"
          placeholder="Search for Quiz"
          aria-label="Search for Assignments"
        />
      </div>

      {/* Buttons */}
      {currentUser.role == "FACULTY" && (
        <div>
          <button className="btn btn-assignment bg-danger text-white rounded-1 me-1" onClick={handleOnClick}>
            <FiPlus /> Quiz
          </button>
          <button className="btn bg-secondary me-1 rounded-1"><IoEllipsisVertical /></button>
        </div>
      )}
    </div>
    <hr />
    </>
  );
}
