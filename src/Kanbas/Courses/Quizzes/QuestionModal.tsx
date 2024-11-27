import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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
  questions: Question[];
  setQuestions: (questions: Question[]) => void;
}

export default function QuestionModal({ setModalOpen, parentQuestion, questions, setQuestions }: QuestionModalProps) {
  const newQuestion = {
    title: "Question Title",
    type: "Multiple Choice",
    points: 0,
    questionDescription: "This is the question description",
    choices: ["Option 1", "Option 2"],
    correctAnswer: ["Option 2"],
  }
  const [question, setQuestion] = useState(parentQuestion || newQuestion);

  const handleChoiceChange = (index: number, value: string) => {
    const updatedChoices = [...question.choices];
    updatedChoices[index] = value;
    setQuestion({ ...question, choices: updatedChoices });
  };

  const addChoice = () => {
    setQuestion({ ...question, choices: [...question.choices, ""] });
  };

  const modifyCorrectAnswer = (choice: any) => {
    // Add or remove the choice from the correctAnswer array
    const isCorrect = question.correctAnswer.includes(choice);
    const updatedCorrectAnswer = isCorrect
      ? question.correctAnswer.filter((ans) => ans !== choice)
      : [...question.correctAnswer, choice];
    setQuestion({
      ...question,
      correctAnswer: updatedCorrectAnswer,
    });
  }

  const handleSaveButton = () => {
    setModalOpen(false);
    setQuestions([...questions, question])
  }

  return (
    <div
      className="modal modal-lg show d-block"
      tabIndex={-1}
      role="dialog"
      style={{ background: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          {/* Modal Header */}
          <div className="modal-header d-flex align-items-center justify-content-between">
            <input
              className="form-control me-3"
              style={{ flex: 1 }}
              value={question.title}
              type="text"
              placeholder="Enter Question Title"
              onChange={(e) =>
                setQuestion({ ...question, title: e.target.value })
              }
            />
            <select
              className="form-select me-3"
              style={{ width: "200px" }}
              value={question.type}
              onChange={(e) =>
                setQuestion({ ...question, type: e.target.value })
              }
            >
              <option value="Multiple Choice">Multiple Choice</option>
              <option value="True/False">True/False</option>
              <option value="Fill In the Blank">Fill In the Blank</option>
            </select>
            <div className="d-flex align-items-center">
              <label htmlFor="points" className="me-2">
                Points:
              </label>
              <input
                id="points"
                type="number"
                className="form-control"
                style={{ width: "80px" }}
                value={question.points}
                onChange={(e) =>
                  setQuestion({ ...question, points: +e.target.value })
                }
              />
            </div>
            <button
              type="button"
              className="btn-close ms-3"
              onClick={() => setModalOpen(false)}
            ></button>
          </div>

          {/* Modal Body */}
          <div className="modal-body">
            <p className="text-muted">
              Enter your question text, then define all possible correct answers
              for the blank.
            </p>
            <p className="text-muted">
              Students will see the question followed by a small text box to
              type their answer.
            </p>
            <ReactQuill
              theme="snow"
              value={question.questionDescription}
              onChange={(value) =>
                setQuestion({ ...question, questionDescription: value })
              }
              placeholder="Write the question description here..."
              className="mb-4"
              style={{ height: "120px", overflowY: "auto" }}
            />

            <h5>Possible Answers:</h5>
            {question.choices.map((choice, index) => (
              <div key={index} className="input-group mb-2 align-items-center">
                <label
                  className={`me-2 ${
                    question.correctAnswer.includes(choice) ? "text-green" : ""
                  }`}
                  htmlFor={`choice-${index}`}
                >
                  {question.correctAnswer.includes(choice)
                    ? "Correct Answer"
                    : "Possible Answer"}
                </label>
                <input
                  id={`choice-${index}`}
                  className="form-control me-2"
                  value={choice}
                  placeholder={`Answer ${index + 1}`}
                  onChange={(e) => {
                    // Handle editing of the choice text
                    const updatedChoices = [...question.choices];
                    updatedChoices[index] = e.target.value;
                    setQuestion({ ...question, choices: updatedChoices });
                  }}
                />
                <div className="form-check me-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={`correctAnswer-${index}`}
                    checked={question.correctAnswer.includes(choice)}
                    onChange={() => modifyCorrectAnswer(choice)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`correctAnswer-${index}`}
                  >
                    Mark as Correct
                  </label>
                </div>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    // Remove the choice from the choices array and correctAnswer array if applicable
                    setQuestion({
                      ...question,
                      choices: question.choices.filter((_, i) => i !== index),
                      correctAnswer: question.correctAnswer.filter(
                        (ans) => ans !== choice
                      ),
                    });
                  }}
                >
                  Remove
                </button>
              </div>
            ))}

            <button
              className="btn btn-secondary w-100 mt-2"
              onClick={addChoice}
            >
              Add New Answer
            </button>
          </div>

          {/* Modal Footer */}
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setModalOpen(false)}
            >
              Close
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSaveButton}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
