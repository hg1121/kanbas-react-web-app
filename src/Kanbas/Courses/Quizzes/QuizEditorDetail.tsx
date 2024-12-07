import { FiChevronDown } from "react-icons/fi";
import { useLocation, useNavigate} from "react-router-dom";
import AssignTo from "../Assignments/AssignTo";
import * as QuizClient from "./client";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";

interface Quiz {
    quizId: string;
    courseId: string;
    title: string;
    quizType: string;
    points: number;
    description: string;
    assignmentGroup: string;
    shuffleAnswers: boolean;
    timeLimit: number;
    multipleAttempts: boolean;
    howManyAttempts: number;
    showCorrectAnswers: string;
    accessCode: string;
    oneQuestionAtATime: boolean;
    webcamRequired: boolean;
    lockQuestionsAfterAnswering: boolean;
    dueDate: string;
    availableDate: string;
    untilDate: string;
    questions: any[];
    published: boolean;
}

interface QuizEditorDetailProps {
  editing: boolean;
  setEditing: (value: boolean) => void;
  setShowDetailPage: (value: boolean) => void;
  quiz: Quiz;
  setQuiz: (quiz: Quiz) => void;
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toISOString().slice(0, 16);
};

export default function QuizEditorDetail({
  editing,
  setEditing,
  setShowDetailPage,
  quiz,
  setQuiz
}: QuizEditorDetailProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const pathSegments = location.pathname.split("/"); // Split path by "/"
  const courseId = pathSegments[3];
  const quizId = pathSegments[5];
  const [newquiz, setNewQuiz] = useState(quiz);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    // Update quiz options dynamically based on checkbox ID
    setNewQuiz((prevQuiz) => ({
      ...prevQuiz,
      [id]: checked,
    }));
  };

  const handleCancleButton = () => {
    setEditing(false);
    setShowDetailPage(false);
    const currentPath = location.pathname || location.hash;
    const basePath = currentPath.substring(0, currentPath.lastIndexOf("/"));

    const basePathWithoutQuery = basePath.split('?')[0]; // Remove query parameters
    // Navigate back to the base path (Quizzes page), ensuring no query params or hash interferes
    navigate(basePathWithoutQuery); 
  };

  const handleSaveButton = async (e: React.FormEvent) =>{
    // prevent the page render automatically
    e.preventDefault();
    await QuizClient.updateQuiz(courseId, quizId, newquiz);
    setQuiz(newquiz);
    setEditing(false); // Disable editing
  }

  useEffect(() => {
    // console.log("newquiz", newquiz);
  }, [newquiz]);
  return (
    <div>
      <form className="d-block">
        <input
          className="form-control mb-1"
          type="text"
          placeholder="Quiz Title"
          value={newquiz.title}
          onChange={(e) =>
            setNewQuiz((prevQuiz: any) => ({
              ...prevQuiz,
              title: e.target.value,
            }))
          }
        />
        <div style={{ height: "50%" }}>
        <p>Quiz Instructions:</p>
        <ReactQuill
          theme="snow"
          value={newquiz.description || ""} // Use `newquiz` here
          onChange={(value: any) =>
            setNewQuiz((prevQuiz: any) => ({
              ...prevQuiz,
              description: value, // Update description in `newquiz`
            }))
          }
          placeholder="Write the quiz description here..."
          className="mb-4"
        />
        </div>
        <div className="d-flex position-relative ps-5" style={{ width: "60%" }}>
          <label htmlFor="quiz-type" className="me-3">
            Quiz Type
          </label>
          <select
            id="quiz-type"
            className="form-control form-control-lg rounded-1 pe-5 mb-3"
            style={{
              width: "50%",
              appearance: "none",
              paddingRight: "30px",
            }}
            onChange={(e) =>
              setNewQuiz((prevQuiz: any) => ({
                ...prevQuiz,
                quizType: e.target.value,
              }))
            }
          >
            <option>Graded Quiz</option>
            <option>Practice Quiz</option>
            <option>Graded Survey</option>
            <option>Ungraded Survey</option>
          </select>
          <FiChevronDown
            style={{
              position: "absolute",
              right: "30%",
              top: "50%",
              transform: "translateY(-50%)",
              pointerEvents: "none",
            }}
          />
        </div>
        <div className="d-flex position-relative ps-5" style={{ width: "60%" }}>
          <label htmlFor="assignment-group" className="me-3">
            Assignment Group
          </label>
          <select
            id="assignment-group"
            className="form-control form-control-lg rounded-1 pe-5 mb-3"
            style={{
              width: "50%",
              appearance: "none",
              paddingRight: "30px",
            }}
            onChange={(e) =>
              setNewQuiz((prevQuiz: any) => ({
                ...prevQuiz,
                assignmentGroup: e.target.value,
              }))
            }
          >
            <option>Quizzes</option>
            <option>Exams</option>
            <option>Assignments</option>
            <option>Project </option>
          </select>
          <FiChevronDown
            style={{
              position: "absolute",
              right: "15%",
              top: "50%",
              transform: "translateY(-50%)",
              pointerEvents: "none",
            }}
          />
        </div>

        <div
          className="custom-control custom-checkbox"
          style={{ width: "50%" }}
        >
          <h4>Options</h4>
          <div className="d-block">
            <div className="checkbox-item">
              <input
                type="checkbox"
                className="custom-control-input me-2"
                id="shuffleAnswers"
                checked={newquiz.shuffleAnswers}
                onChange={(e) => handleCheckboxChange(e)}
              />
              <label className="custom-control-label" htmlFor="shuffleAnswers">
                Shuffle Answers
              </label>
            </div>
            <div className="checkbox-item">
              <input
                type="checkbox"
                className="custom-control-input me-2"
                id="timeLimit"
                checked={newquiz.timeLimit > 0}
              />
              <label className="custom-control-label me-3" htmlFor="timeLimit">
                Time Limit
              </label>
              <input
                type="text"
                className="custom-control-input me-2"
                id="time"
                value={newquiz.timeLimit}
                onChange={(e) => {
                  setNewQuiz((prevQuiz: any) => ({
                    ...prevQuiz,
                    timeLimit: parseInt(e.target.value, 10),
                  }));
                }}
              />
              <label className="custom-control-label" htmlFor="time">
                Minutes
              </label>
            </div>
            <div className="checkbox-item">
              <input
                type="checkbox"
                className="custom-control-input me-2"
                id="multipleAttempts"
                checked={newquiz.multipleAttempts}
                onChange={(e) => handleCheckboxChange(e)}
              />
              <label
                className="custom-control-label"
                htmlFor="multipleAttempts"
              >
                Allow Multiple Attempts
              </label>
            </div>
          </div>
        </div>

        <br />
        <br />
        <br />
        <table>
          <tbody>
            <tr>
              <td className="text-end align-top fs-5">
                <label className="me-1">Assign</label>
              </td>
              <td
                style={{
                  border: "1px solid rgb(232,232,235)",
                  padding: "10px",
                }}
                colSpan={2}
                className="rounded-1"
              >
                <div className="position-relative" style={{ width: "100%" }}>
                  <label>Assign to</label>
                  <AssignTo />
                </div>

                <div className="position-relative" style={{ width: "100%" }}>
                  <label htmlFor="wd-due-date"> Due </label> <br />
                  <input
                    type="datetime-local"
                    id="wd-due-date"
                    value={formatDate(newquiz.dueDate)}
                    className="form-control"
                    width={100}
                    onChange={(e) => {
                      setNewQuiz((prevQuiz: any) => ({
                        ...prevQuiz,
                        dueDate: e.target.value,
                      }));
                    }}
                  />
                  <br />
                </div>
                <tr className="d-flex mt-3">
                  <td className="me-1 w-50">
                    <label htmlFor="wd-available-from"> Available from </label>{" "}
                    <br />
                    <input
                      type="datetime-local"
                      id="wd-available-from"
                      value={formatDate(newquiz.availableDate)}
                      className="form-control"
                      onChange={(e) => {
                        setNewQuiz((prevQuiz: any) => ({
                          ...prevQuiz,
                          availableDate: e.target.value,
                        }));
                      }}
                    />
                  </td>

                  <td className="me-1 w-50">
                    <label htmlFor="wd-available-until"> Until </label> <br />
                    <input
                      type="datetime-local"
                      id="wd-available-until"
                      value={formatDate(newquiz.untilDate)}
                      className="form-control"
                      onChange={(e) => {
                        setNewQuiz((prevQuiz: any) => ({
                          ...prevQuiz,
                          untilDate: e.target.value,
                        }));
                      }}
                    />
                  </td>
                </tr>
              </td>
            </tr>
          </tbody>
        </table>
        <hr />
        <div>
          <button onClick={handleCancleButton}>Cancle</button>
          <button onClick={(e)=> handleSaveButton(e)}>Save</button>
        </div>
      </form>
    </div>
  );
}
