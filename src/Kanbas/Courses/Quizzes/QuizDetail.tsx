import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router";
import { FaPencil } from "react-icons/fa6";
import "./QuizDetail.css";
import * as QuizClient from "./client";
import QuizEditorMain from "./QuizEditorMain";
import QuizPreview from "./QuizPreview"; // Import QuizPreview
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

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

export default function QuizDetail() {
  const location = useLocation();
  const pathSegments = location.pathname.split("/"); // Split path by "/"
  const courseId = pathSegments[3];
  const quizId = pathSegments[5];
  const navigate = useNavigate();

  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const [quiz, setQuiz] = useState(
    location.state?.quiz || location.state?.selectedQuiz
  );
  // console.log("quiz:", quiz);
  const [editing, setEditing] = useState(false);
  const [preview, setPreview] = useState(false);

  const [score, setScore] = useState();
  const [lastAttemptDate, setLastAttemptDate] = useState("");
  const [totalAttempts, setTotalAttempts] = useState(0);
  const fetchLastAttempt = async () => {
    try {
      const data = await QuizClient.fetchLastAttempt(courseId, quizId, currentUser._id);
      const lastAttempt = data.lastAttempt;
      if (lastAttempt) {
        setTotalAttempts(data.totalAttempts)
        setScore(lastAttempt.score);
        setLastAttemptDate(lastAttempt.createdAt);
      } else {
        // Initialize empty answers for each question if no previous attempt
        // setAnswers(questions.map(() => ({ selectedOptions: [] })));
      }
    } catch (error) {
      console.error("Error fetching last attempt:", error);
    }
  };

  useEffect(() => {
    // Fetch updated quiz data if necessary
    if (!quiz) {
      const fetchQuiz = async () => {
        try {
          const fetchedQuiz = await QuizClient.fetchQuiz(courseId, quizId);
          setQuiz(fetchedQuiz);
        } catch (error) {
          console.error("Error fetching quiz:", error);
        }
      };
      fetchQuiz();
    }
    fetchLastAttempt();
  }, [courseId, quizId, quiz]);

  const saveQuiz = async () => {
    try {
      await axios.put(`/api/courses/${courseId}/quizzes/${quizId}`, quiz);
      setEditing(false); // Disable editing
    } catch (error) {
      console.error("Error saving quiz", error);
    }
  };

  const handleStartQuizButton = () => {
    navigate(`/Kanbas/Courses/${courseId}/quizzes/${quizId}/take-quiz`);
  }

  const calculatePoints = (quiz: any) => {
    if (quiz.questions) {
      return quiz.questions.reduce((total: number, question: any) => total + (question.points || 0), 0)
    }
    return 0;
  }

  return (
    <div>
      {currentUser.role === "FACULTY" ? (
        <div>
          <div className="btns">
            <button
              className="me-2 rounded-1 border-1"
              onClick={() => setPreview(!preview)}
              disabled={!quiz || Object.keys(quiz).length === 0}
            >
              {preview ? "Back to Details" : "Preview"}
            </button>
            <button
              className="rounded-1 border-1"
              onClick={() => setEditing(!editing)}
            >
              <FaPencil /> Edit
            </button>
          </div>

          {preview ? (
            <QuizPreview questions={quiz.questions} />
          ) : editing ? (
            <QuizEditorMain
              editing={editing}
              setEditing={setEditing}
              quiz={quiz}
              setQuiz={setQuiz}
            />
          ) : (
            <>
              <hr />
              <h3>{quiz.title}</h3>
              <table className="quiz-table">
                <tbody>
                  <tr className="quiz-row">
                    <td className="quiz-label">Quiz Type</td>
                    <td className="quiz-value">{quiz.quizType}</td>
                  </tr>
                  <tr className="quiz-row">
                    <td className="quiz-label">Points</td>
                    <td className="quiz-value">{calculatePoints(quiz)}</td>
                  </tr>
                  <tr className="quiz-row">
                    <td className="quiz-label">Assignment Group</td>
                    <td className="quiz-value">{quiz.assignmentGroup}</td>
                  </tr>
                  <tr className="quiz-row">
                    <td className="quiz-label">Shuffle Answers</td>
                    <td className="quiz-value">
                      {quiz.shuffleAnswers ? "Yes" : "No"}
                    </td>
                  </tr>
                  <tr className="quiz-row">
                    <td className="quiz-label">Time Limit</td>
                    <td className="quiz-value">{quiz.timeLimit} Minutes</td>
                  </tr>
                  <tr className="quiz-row">
                    <td className="quiz-label">Multiple Attempts</td>
                    <td className="quiz-value">
                      {quiz.multipleAttempts ? "Yes" : "No"}
                    </td>
                  </tr>
                  <tr className="quiz-row">
                    <td className="quiz-label"> How Many Attempts </td>
                    <td className="quiz-value">{quiz.howManyAttempts}</td>
                  </tr>
                  <tr className="quiz-row">
                    <td className="quiz-label">Show Correct Answers</td>
                    <td className="quiz-value">{quiz.showCorrectAnswers}</td>
                  </tr>
                  <tr className="quiz-row">
                    <td className="quiz-label">Access Code </td>
                    <td className="quiz-value">{quiz.accessCode ? quiz.accessCode : "Not needed"}</td>
                  </tr>
                  <tr className="quiz-row">
                    <td className="quiz-label">One Question At a Time</td>
                    <td className="quiz-value">
                      {quiz.oneQuestionAtATime ? "Yes" : "No"}
                    </td>
                  </tr>
                  <tr className="quiz-row">
                    <td className="quiz-label">Webcam Required</td>
                    <td className="quiz-value">
                      {quiz.webcamRequired ? "Yes" : "No"}
                    </td>
                  </tr>
                  <tr className="quiz-row">
                    <td className="quiz-label">
                      Lock Questions After Answering
                    </td>
                    <td className="quiz-value">
                      {quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}
                    </td>
                  </tr>
                </tbody>
              </table>

              <table className="table">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Due</th>
                    <th scope="col">For</th>
                    <th scope="col">Available from</th>
                    <th scope="col">Until</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td scope="row">{formatDate(quiz.dueDate)}</td>
                    <td>Everyone</td>
                    <td>{formatDate(quiz.availableDate)}</td>
                    <td>{formatDate(quiz.untilDate)}</td>
                  </tr>
                </tbody>
              </table>
            </>
          )}
        </div>
      ) : (
        <div className="d-flex justify-content-center align-items-center text-center">
          <div>
          <p>{quiz.questions.length} Questions </p>
          <p>Time Limit: {quiz.timeLimit} Minutes</p>
          {totalAttempts >= quiz.howManyAttempts && <p className="text-danger">You have run out of attempts.</p>}
          {score && <p>Last Attempt at {formatDate(lastAttemptDate)}, get score: {score}</p>}
          <button 
            className="btn btn-danger rounded-1" 
            onClick={handleStartQuizButton}
            disabled={totalAttempts >= quiz.howManyAttempts}
          > Start Quiz </button>
          </div>
        </div>
      )}
    </div>
  );
}
