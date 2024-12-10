import { useEffect, useState } from "react";
import QuestionCard from "./QuestionCard";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import * as QuizClient from './client';

interface Question {
  title: string;
  type: string;
  points: number;
  questionDescription: string;
  choices: string[];
  correctAnswer: string[];
}

interface QuizPreviewProps {
  questions: Question[];
}

export default function QuizPreview({ questions }: QuizPreviewProps) {
  const location = useLocation();
  const pathSegments = location.pathname.split("/"); // Split path by "/"
  const courseId = pathSegments[3];
  const quizId = pathSegments[5];
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const facultyId = currentUser._id;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<any[]>([]); // To track answers for all questions
  const [score, setScore] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [lastAttemptDate, setLastAttemptDate] = useState<string | null>(null);

  const fetchLastAttempt = async () => {
    try {
      const data = await QuizClient.fetchLastAttempt(courseId, quizId, facultyId);
      const lastAttempt = data.lastAttempt;
      if (lastAttempt) {
        setAnswers(lastAttempt.answers);
        setScore(lastAttempt.score);
        setLastAttemptDate(lastAttempt.createdAt);
        setSubmitted(true); // Mark as submitted if there's an existing attempt
      } else {
        // Initialize empty answers for each question if no previous attempt
        setAnswers(questions.map(() => ({ selectedOptions: [] })));
      }
    } catch (error) {
      console.error("Error fetching last attempt:", error);
    }
  };

  const handleAnswerChange = (questionIndex: number, selectedOptions: string[]) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[questionIndex] = { questionIndex, selectedOptions };
      return updatedAnswers;
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await QuizClient.submitAttempt(courseId, quizId, facultyId, answers);
      setScore(response.score);
      setSubmitted(true);
      setLastAttemptDate(new Date().toISOString()); // Set submission timestamp
    } catch (error) {
      console.error("Error submitting answers:", error);
    }
  };

  useEffect(() => {
    fetchLastAttempt();
  }, [quizId, facultyId]);

  const handleQuestionClick = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  const navigateToNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <div className="d-flex">
      {/* Sidebar with question titles */}
      <div
        style={{
          width: "30%",
          borderRight: "1px solid #ddd",
          padding: "1rem",
          overflowY: "auto",
          height: "100vh",
        }}
      >
        <h5 className="text-muted">Question Lists</h5>
        <ul className="list-group">
          {questions.map((question, index) => (
            <li
              key={index}
              className={`list-group-item ${
                currentQuestionIndex === index ? "active" : ""
              }`}
              style={{ cursor: "pointer" }}
              onClick={() => handleQuestionClick(index)}
            >
              {index + 1}. Question {index + 1}
            </li>
          ))}
        </ul>
      </div>

      {/* Main content for the selected question */}
      <div style={{ width: "70%", padding: "1rem" }} className="ms-4">
        <h5 className="text-muted mb-3">Quiz Preview</h5>
        <QuestionCard
          question={questions[currentQuestionIndex]}
          index={currentQuestionIndex}
          selectedOptions={answers[currentQuestionIndex]?.selectedOptions || []}
          onAnswerChange={(selectedOptions) =>
            handleAnswerChange(currentQuestionIndex, selectedOptions)
          }
          navigateToNext={navigateToNext}
          submitted={submitted}
        />
        <div className="mt-4">
          {submitted && (
            <p>
              <strong>Last Attempt:</strong> {lastAttemptDate ? new Date(lastAttemptDate).toLocaleString() : "N/A"}
            </p>
          )}
          <button
            className="btn btn-primary me-2 rounded-1"
            onClick={handleSubmit}
            disabled={submitted}
          >
            Submit
          </button>
          {score !== null && (
            <p className="mt-3">
              <strong>Your Score:</strong> {score}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}