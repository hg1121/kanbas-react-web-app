import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

import * as QuizClient from "./client";
import QuizzesButtons from "./QuizzesButtons";
import { BsGripVertical } from "react-icons/bs";
import { FaCaretDown } from "react-icons/fa";
import { RxRocket } from "react-icons/rx";
import { useSelector } from "react-redux";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  return date.toLocaleString("en-US", options).replace(",", "");
};

export default function QuizList() {
  const location = useLocation();
  const pathSegments = location.pathname.split("/"); // Split path by "/"
  const courseId = pathSegments[3];
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [quiz, setQuiz] = useState({});
  const [quizzes, setQuizzes] = useState<any[]>([]);

  const fetchQuizzesForCourse = async () => {
    const newQuizzes = await QuizClient.fetchQuizzes(courseId);
    setQuizzes(newQuizzes);
  };

  const [contextOpen, setContextOpen] = useState(false);

  // Fetch quizzes on load
  useEffect(() => {
    fetchQuizzesForCourse();
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [courseId]);

  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [selectedQuiz, setSelectedQuiz] = useState<any>(null); // Store clicked quiz
  const deleteQuiz = async (quizId: string) => {
    try {
      await axios.delete(`/api/courses/${courseId}/quizzes/${quizId}`);
      setQuizzes(quizzes.filter((quiz) => quiz.id !== quizId)); // Update UI
    } catch (error) {
      console.error("Error deleting quiz", error);
    }
  };

  const handleIconClick = (event: React.MouseEvent<SVGElement>, quiz: any) => {
    event.stopPropagation();
    const iconRect = event.currentTarget.getBoundingClientRect();
    setMenuPosition({
      top: iconRect.bottom+30,
      left: iconRect.left-100,
    });
    setSelectedQuiz(quiz); // Set the clicked quiz
    setContextOpen(true);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setContextOpen(false); // Close menu if clicked outside
    }
  };

  const isOpen = (avaliable: any, dueDate: any) => {
    const currentDate = new Date(); // Get the current date and time
    const dueDateObj = new Date(dueDate); // Convert dueDate string to a Date object
    const avaDateObj = new Date(avaliable); // Convert dueDate string to a Date object
    return avaDateObj < currentDate && currentDate < dueDateObj; // Check if the current date is after the due date
  };
  

  return (
    <div id="wd-assignments">
      <QuizzesButtons/>
      <ul id="wd-modules" className="list-group rounded-0 d-flex flex-column">
        <li className="wd-title p-4 ps-2 bg-secondary d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <BsGripVertical className="me-1 fs-3" />
            <FaCaretDown className="me-1 fs-4" />
            <span style={{ fontSize: "24px", fontWeight: "bold" }}>
              Assignment Quizzes
            </span>
          </div>
        </li>
        {quizzes
          .filter((quiz: any) => quiz.courseId === courseId)
          .map((quiz: any, index: any) => (
            <li
              className="wd-module list-group-item p-3 fs-5 border-gray d-flex justify-content-between align-items-center"
              key={index}
            >
              <span className="d-flex align-items-center">
                <RxRocket className="me-4 fs-3 text-green" />
                <span>
                  <h4>
                    {currentUser.role === "FACULTY" ? (
                      <Link
                        to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz.quizId}`}
                        state={{ quiz, editing: true }}
                      >
                        {quiz.title}
                      </Link>
                    ) : (
                      quiz.title
                    )}
                  </h4>
                  <span>
                    {isOpen(quiz.availableDate, quiz.dueDate)
                      ? "Closed"
                      : "Open"}
                  </span>{" "}
                  | <b>Not available until </b>
                  {formatDate(quiz.availableDate)} | <br />
                  <b>Due </b>
                  {formatDate(quiz.dueDate)} | {quiz.points} pts
                </span>
              </span>
              <div>
                {/* {currentUser.role === "FACULTY" && <FaTrash className="text-danger me-2 mb-1" onClick={() => {handleDelete(assignment._id)}}/>} */}
                <div className="float-end">
                  <GreenCheckmark />
                  <IoEllipsisVertical
                    className="fs-4"
                    onClick={(e) => handleIconClick(e, quiz)}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>
            </li>
          ))}
      </ul>
      {contextOpen && (
        <div
          ref={menuRef}
          className="dropdown-menu show" // Use Bootstrap's "show" class to make it visible
          style={{
            position: "absolute",
            top: `${menuPosition.top}px`,
            left: `${menuPosition.left}px`,
            zIndex: 1000,
          }}
        >
          <Link className="dropdown-item" to={`/Kanbas/Courses/${courseId}/Quizzes/${selectedQuiz.quizId}`}
                        state={{ selectedQuiz, editing: true }}>
            Edit
          </Link>
          <Link className="dropdown-item" to="#">
            DELETE
          </Link>
          <a className="dropdown-item" href="#">
            Publish
          </a>
          <a className="dropdown-item" href="#">
            Copy
          </a>
          <Link className="dropdown-item" to="#">
            Sort
          </Link>
        </div>
      )}
      {/* {modalOpen && <MyModal modalOpen = {modalOpen} aid={deleteAid} cid={cid} assignments = {assignments} setAssignments = {setAssignments}/>} */}
    </div>
  );
}
function setMenuPosition(arg0: {
  top: number; // Position below the icon
  left: number;
}) {
  throw new Error("Function not implemented.");
}
