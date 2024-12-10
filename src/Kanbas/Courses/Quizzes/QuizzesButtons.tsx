import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";
import { IoEllipsisVertical } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import * as QuizClient from "./client";

export default function QuizzesButtons() {
  const location = useLocation();
  const pathSegments = location.pathname.split("/"); // Split path by "/"
  const courseId = pathSegments[3];
  const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
  const COURSES_API = `${REMOTE_SERVER}/api/courses`;

  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [addQuiz, setAddQuiz] = useState(false);
  const navigate = useNavigate();
  const newQuiz = {
    _id: "1234567",
    title: "untitled new quiz",
    courseId: courseId,
    quizType: "Graded Quiz",
    points: 50,
    assignmentGroup: "Quizzes",
    shuffleAnswers: true,
    timeLimit: 20,
    multipleAttempts: false,
    howManyAttempts: 1,
    showCorrectAnswers: "Immediately",
    accessCode: "",
    oneQuestionAtATime: true,
    webcamRequired: false,
    lockQuestionsAfterAnswering: false,
    dueDate: "2024-12-15",
    availableDate: "2024-12-01",
    untilDate: "2024-12-20",
    questions: [],
    published: false
  }

  const handleOnClick = async() => {
    setAddQuiz(!addQuiz);
    // const uniqueId = new Date().getTime().toString();
    const createdQuiz = await QuizClient.addQuiz(courseId, newQuiz);
    navigate(`${createdQuiz._id}`, { state: {quiz: createdQuiz} });
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
      {(currentUser.role === "FACULTY" || currentUser.role === "ADMIN") && (
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
