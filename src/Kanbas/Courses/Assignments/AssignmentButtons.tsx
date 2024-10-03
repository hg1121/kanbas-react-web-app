import { FiSearch } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";
import { SetStateAction, useState } from "react";
export default function AssignmentButtons() {
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
      <div>
        <button
          className="btn bg-secondary me-1 rounded-1"
        >
          <FiPlus /> Group
        </button>
        <button
          className="btn btn-assignment bg-danger text-white rounded-1"
        >
          <FiPlus /> Assignment
        </button>
      </div>
    </div>
  );
}
