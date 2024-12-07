import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import * as QuizClient from "./client";
import { useLocation } from "react-router";


interface Question {
  title: string;
  type: string;
  points: number;
  questionDescription: string;
  choices: string[];
  correctAnswer: string[];
}

interface QuestionModalProps {
  setModalOpen: (modalOpen: boolean) => void;
  parentQuestion?: Question;
  setParentQuestion: (parentQuestion: Question | undefined) => void;
  questions: Question[];
  setQuestions: (questions: Question[]) => void;

}

export default function QuestionModal({ setModalOpen, parentQuestion, setParentQuestion, questions, setQuestions }: QuestionModalProps) {
  const location = useLocation();
  const pathSegments = location.pathname.split('/'); // Split path by "/"
  const cid = pathSegments[3];
  const qid = pathSegments[5];
  const newQuestion = {
    title: "Question Title",
    type: "Multiple Choice",
    points: 0,
    questionDescription: "This is the question description",
    choices: [],
    correctAnswer: [],
  };
  const [question, setQuestion] = useState(parentQuestion || newQuestion);

  const handleChoiceChange = (index: number, value: string) => {
    const updatedChoices = [...question.choices];
    updatedChoices[index] = value;
    setQuestion({ ...question, choices: updatedChoices });
  };

  const addChoice = () => {
    setQuestion({ ...question, choices: [...question.choices, ""] });
  };

  const modifyCorrectAnswer = (choice: string) => {
    const isCorrect = question.correctAnswer.includes(choice);
    const updatedCorrectAnswer = isCorrect
      ? question.correctAnswer.filter((ans) => ans !== choice)
      : [...question.correctAnswer, choice];
    setQuestion({ ...question, correctAnswer: updatedCorrectAnswer });
  };

  const removeCorrectAnswer = (index: number) => {
    const updatedAnswers = question.correctAnswer.filter((_, i) => i !== index);
    setQuestion({ ...question, correctAnswer: updatedAnswers });
  };

  const handleSaveButton = () => {
    if (parentQuestion) {
      // Update the specific question in the questions array
      const updatedQuestions = questions.map((q) =>
        q === parentQuestion ? question : q
      );
      setQuestions(updatedQuestions); // Update the parent component's questions
    } else {
      // Add a new question
      setQuestions([...questions, question]);
    }
    setQuestion(newQuestion);
    setModalOpen(false); // Close the modal
  };

  const renderAnswers = () => {
    if (question.type === "Multiple Choice") {
      return (
        <>
          {question.choices.map((choice, index) => (
            <div key={index} className="input-group mb-2 align-items-center">
              <input
                className="form-control me-2"
                value={choice}
                placeholder={`Answer ${index + 1}`}
                onChange={(e) => handleChoiceChange(index, e.target.value)}
              />
              <div className="form-check me-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={question.correctAnswer.includes(choice)}
                  onChange={() => modifyCorrectAnswer(choice)}
                />
                <label className="form-check-label">Mark as Correct</label>
              </div>
              <button
                className="btn btn-danger"
                onClick={() => {
                  setQuestion({
                    ...question,
                    choices: question.choices.filter((_, i) => i !== index),
                    correctAnswer: question.correctAnswer.filter((ans) => ans !== choice),
                  });
                }}
              >
                Remove
              </button>
            </div>
          ))}
          <button className="btn btn-secondary w-100 mt-2" onClick={addChoice}>
            Add New Answer
          </button>
        </>
      );
    } else if (question.type === "True/False") {
      return (
        <>
          {["True", "False"].map((choice, index) => (
            <div key={index} className="input-group mb-2 align-items-center">
              <label className="me-2">{choice}</label>
              <div className="form-check me-2">
                <input
                  type="radio"
                  className="form-check-input"
                  name="trueFalse"
                  checked={question.correctAnswer.includes(choice)}
                  onChange={() =>
                    setQuestion({ ...question, correctAnswer: [choice] })
                  }
                />
                <label className="form-check-label">Mark as Correct</label>
              </div>
            </div>
          ))}
        </>
      );
    } else if (question.type === "Fill In the Blank") {
      return (
        <>
          {question.correctAnswer.map((answer, index) => (
            <div key={index} className="input-group mb-2 align-items-center">
              <input
                className="form-control me-2"
                value={answer}
                placeholder={`Correct Answer ${index + 1}`}
                onChange={(e) => {
                  const updatedAnswers = [...question.correctAnswer];
                  updatedAnswers[index] = e.target.value;
                  setQuestion({ ...question, correctAnswer: updatedAnswers });
                }}
              />
              <button
                className="btn btn-danger"
                onClick={() => removeCorrectAnswer(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            className="btn btn-secondary w-100 mt-2"
            onClick={() =>
              setQuestion({ ...question, correctAnswer: [...question.correctAnswer, ""] })
            }
          >
            Add New Answer
          </button>
        </>
      );
    }
  };

  return (
    <div
      className="modal modal-lg show d-block"
      tabIndex={-1}
      role="dialog"
      style={{ background: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header d-flex align-items-center justify-content-between">
            <input
              className="form-control me-3"
              value={question.title}
              placeholder="Enter Question Title"
              onChange={(e) => setQuestion({ ...question, title: e.target.value })}
            />
            <select
              className="form-select me-3"
              value={question.type}
              onChange={(e) => {
                const newType = e.target.value;
                setQuestion((prevQuestion) => ({
                  ...prevQuestion,
                  type: newType,
                  choices: newType === "True/False" ? ["True", "False"] : prevQuestion.choices,
                  correctAnswer: newType === "True/False" ? [] : prevQuestion.correctAnswer, // Reset correctAnswer for True/False
                }));
              }}
            >
              <option value="Multiple Choice">Multiple Choice</option>
              <option value="True/False">True/False</option>
              <option value="Fill In the Blank">Fill In the Blank</option>
            </select>
            <input
              type="number"
              className="form-control"
              value={question.points}
              onChange={(e) => setQuestion({ ...question, points: +e.target.value })}
            />
            <button className="btn-close ms-3" onClick={() => setModalOpen(false)}></button>
          </div>

          <div className="modal-body">
            <ReactQuill
              value={question.questionDescription}
              onChange={(value) => setQuestion({ ...question, questionDescription: value})}
            />
            <h5>Answers:</h5>
            {renderAnswers()}
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={() => setModalOpen(false)}>
              Close
            </button>
            <button className="btn btn-primary" onClick={handleSaveButton}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
