import { useState } from "react";
import QuestionCard from "./QuestionCard";

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
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

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
        <h5 className="text-muted">Question Titles</h5>
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
      <div style={{ width: "70%", padding: "1rem" }}>
        <h5 className="text-muted mb-3">Quiz Preview</h5>
        <QuestionCard
          question={questions[currentQuestionIndex]}
          index={currentQuestionIndex}
          navigateToNext={navigateToNext}
        />
      </div>
    </div>
  );
}