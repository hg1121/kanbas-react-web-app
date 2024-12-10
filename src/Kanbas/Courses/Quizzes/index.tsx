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
import QuizGreenCheckmark from "./QuizGreenCheckmark";
import RedCircleMark from "./RedCircleMark";


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
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [lastAttempts, setLastAttempts] = useState<{ [key: string]: number }>({});

  const fetchQuizzesForCourse = async () => {
    const newQuizzes = await QuizClient.fetchQuizzes(courseId);
    if(currentUser.role === "FACULTY"){
      setQuizzes(newQuizzes);
    }else if (currentUser.role === "STUDENT"){
      const publishedQuizzes = newQuizzes.filter((q:any) => q.published);
      setQuizzes(publishedQuizzes);
    }
  };

  const [contextOpen, setContextOpen] = useState(false);

  const fetchLastAttempts = async () => {
    const attempts: { [key: string]: number } = {};
  
    await Promise.all(
      quizzes.map(async (quiz: any) => {
        try {
          const lastAttempt = await QuizClient.fetchLastAttempt(courseId, quiz._id, currentUser._id);
          // console.log(lastAttempt);
          attempts[quiz._id] = lastAttempt?.lastAttempt.score; // Store score or null if no attempt
        } catch (error) {
          console.error(`Error fetching last attempt for quiz ${quiz._id}`, error);
        }
      })
    );
  
    // console.log(attempts);
    setLastAttempts(attempts);

  };

  useEffect(() => {
    if (currentUser.role === "STUDENT" && quizzes.length > 0) {
      fetchLastAttempts();
    }
  }, [quizzes, currentUser]);

  // Fetch quizzes on load
  useEffect(() => {
    console.log('quiz list rerendered');
    fetchQuizzesForCourse();
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [courseId, location]);

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

  const handleDelete = async(selectedQuiz: any) => {
    await QuizClient.deleteQuiz(courseId, selectedQuiz._id);
    fetchQuizzesForCourse();
    setContextOpen(false);
  }

  const handlePublishUpdate = async(selectedQuiz: any) => {
    await QuizClient.updateQuiz(courseId, selectedQuiz._id, {...selectedQuiz, published: !selectedQuiz.published});
    fetchQuizzesForCourse();
    setContextOpen(false);
  }

  function getQuizAvailability(availableDate: string, dueDate: string): string {
    const now = new Date();
    const available = new Date(availableDate);
    const due = new Date(dueDate);
  
    if (now > due) {
      return "Closed";
    } else if (now >= available && now <= due) {
      // console.log("now: ", now, "due: ", due, "available: ", available );
      return "Available";
    } else if (now < available) {
      return `Not available until ${available.toLocaleDateString()} ${available.toLocaleTimeString()}`;
    }
    return "Unknown";
  }

  const calculatePoints = (quiz: any) => {
    if (quiz.questions) {
      return quiz.questions.reduce((total: number, question: any) => total + (question.points || 0), 0)
    }
    return 0;
  }
  

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
              <span className="d-flex align-items-center" style={{width: "90%"}}>
                <RxRocket className="me-4 fs-3 text-green" />
                <span>
                  <h4>
                    {/* {currentUser.role === "FACULTY" ? ( */}
                      <Link
                        to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}`}
                        state={{quiz}}
                      >
                        {quiz.title}
                      </Link>
                    {/* ) : (
                      quiz.title
                    )} */}
                  </h4>
                  <span> {getQuizAvailability(quiz.availableDate, quiz.dueDate)} </span> | {" "}
                  <b>Due </b> {formatDate(quiz.dueDate)} | {" "}
                  {calculatePoints(quiz)} pts | {" "}
                  {quiz.questions.length} Questions 
                  {currentUser.role === "STUDENT" && lastAttempts[quiz._id] != null && (
                    <span> | Last Attempt: <strong className="me-1">Score: {lastAttempts[quiz._id]}</strong></span>
                  )}
                </span>
              </span>
              <div>
                {/* {currentUser.role === "FACULTY" && <FaTrash className="text-danger me-2 mb-1" onClick={() => {handleDelete(assignment._id)}}/>} */}
                <div className="float-end">
                  {quiz.published ? <QuizGreenCheckmark /> : <RedCircleMark />}
                  {/* <QuizGreenCheckmark isPublished={quiz.published}/> */}
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
          <Link className="dropdown-item" to={`/Kanbas/Courses/${courseId}/Quizzes/${selectedQuiz._id}`}
                        state={{ selectedQuiz}}>
            Edit
          </Link>
          <li className="dropdown-item" onClick={() => {handleDelete(selectedQuiz)}}>
            Delete
          </li>
          <li className="dropdown-item" onClick = {() => {handlePublishUpdate(selectedQuiz)}}>
            {selectedQuiz.published ? "Unpublish": "Publish"}
          </li>
          <a className="dropdown-item" href="#">
            Copy
          </a>
          <Link className="dropdown-item" to="#">
            Sort
          </Link>
        </div>
      )}
    </div>
  );
}
function setMenuPosition(arg0: {
  top: number; // Position below the icon
  left: number;
}) {
  throw new Error("Function not implemented.");
}
