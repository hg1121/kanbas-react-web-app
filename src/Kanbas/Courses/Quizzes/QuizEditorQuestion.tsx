import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import QuizModal from "./QuestionModal";
import * as QuizClient from "./client";
import { useLocation, useNavigate } from "react-router";
import { GoQuestion } from "react-icons/go";
import { useSelector } from "react-redux";
import { FaPencil, FaTrash } from "react-icons/fa6";

interface Question {
  title: string;
  type: string;
  points: number;
  questionDescription: string;
  choices: string[];
  correctAnswer: string[];
}

interface Quiz {
  quizId: string;
  courseId: string;
  title: string;
  quizType: string;
  points: number;
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
  quiz: Quiz;
  setQuiz: (quiz: Quiz) => void;
}

export default function QuizEditorQuestion({
  quiz,
  setQuiz,
}: QuizEditorDetailProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const pathSegments = location.pathname.split("/"); // Split path by "/"
  const courseId = pathSegments[3];
  const quizId = pathSegments[5];

  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [selectedQuestion, setSelectedQuestion] = useState();
  const [questions, setQuestions] = useState<Question[]>(quiz.questions);
  const [modalOpen, setModalOpen] = useState(false);

  const handleAddNewQuestionButton = () => {
    setModalOpen(true);
  };

  const handleEditIcon = (question: any) => {
    setSelectedQuestion(question);
    setModalOpen(true);
  };

  const handleDeleteIcon = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleSaveButton = async () => {
    const newQuiz = { ...quiz, questions };
    setQuiz(newQuiz);
    await QuizClient.updateQuiz(courseId, quizId, newQuiz);
    navigate(location.pathname.split("?")[0].split("/").slice(0, -1).join("/"));
  };

  return (
    <div className="container">
      <h3 className="text-center mb-4">Quiz Questions</h3>
      <div>
        {currentUser.role === "FACULTY" ? (
          <div>
            {questions.map((question, index) => (
              <div
                key={index}
                className="d-flex align-items-center justify-content-between mb-3 p-2 bg-light rounded"
                style={{ border: "1px solid #ddd" }}
              >
                <div className="d-flex align-items-center">
                  <GoQuestion className="me-2 text-secondary fs-5" />
                  <p className="mb-0">{question.title}</p>
                </div>
                <div>
                  <FaPencil
                    className="text-primary me-3 cursor-pointer"
                    onClick={() => handleEditIcon(question)}
                    style={{ cursor: "pointer" }}
                  />
                  <FaTrash
                    className="text-danger cursor-pointer"
                    onClick={() => handleDeleteIcon(index)}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>
            ))}
            <div className="text-center">
              <button className="btn btn-primary rounded-1" onClick={handleAddNewQuestionButton}>
                <FiPlus /> Add New Question
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <button className="btn btn-success">Start Quiz</button>
          </div>
        )}
      </div>

      <hr className="my-4" />
      <div className="d-flex justify-content-between">
        <button className="btn btn-secondary rounded-1" onClick={() => navigate(-1)}>
          Cancel
        </button>
        <button className="btn btn-primary rounded-1" onClick={handleSaveButton}>
          Save Changes
        </button>
      </div>
      {modalOpen && (
        <QuizModal
          setModalOpen={setModalOpen}
          parentQuestion={selectedQuestion}
          questions={questions}
          setQuestions={setQuestions}
        />
      )}
    </div>
  );
}