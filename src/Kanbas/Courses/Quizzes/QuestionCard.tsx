import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

interface Question {
  title: string;
  type: string;
  points: number;
  questionDescription: string;
  choices: string[];
  correctAnswer: string[];
}

interface QuestionCardProps {
  question: Question; // The current question object
  index: number; // Index of the question
  selectedOptions: string[]; // The selected options for the question
  onAnswerChange: (selectedOptions: string[]) => void; // Callback to handle answer changes
  navigateToNext: () => void; // Function to navigate to the next question
  submitted: boolean; // Indicates if the quiz has been submitted
}

export default function QuestionCard({
  question,
  index,
  selectedOptions,
  onAnswerChange,
  navigateToNext,
  submitted,
}: QuestionCardProps) {
  const handleOptionChange = (option: string, isChecked: boolean) => {
    const updatedOptions = isChecked
      ? [...selectedOptions, option]
      : selectedOptions.filter((opt) => opt !== option);
    onAnswerChange(updatedOptions);
  };

  const isAnswerCorrect = () => {
    if (question.type === "Fill In the Blank") {
      // Check if any correct answer matches the user-provided answer
      return question.correctAnswer.some(
        (correct) =>
          correct.trim().toLowerCase() === (selectedOptions[0] || "").trim().toLowerCase()
      );
    }
  
    // For multiple-choice and true/false
    return (
      JSON.stringify(selectedOptions.sort()) ===
      JSON.stringify(question.correctAnswer.sort())
    );
  };

  return (
    <div>
      <h5>Question {index + 1}</h5>
      <p>{question.questionDescription.replaceAll(/<\/?p[^>]*>/g, "")}</p>
      {question.type === "Fill In the Blank" ? (
        <div>
          <input
            type="text"
            value={selectedOptions[0] || ""}
            onChange={(e) => onAnswerChange([e.target.value])}
            disabled={submitted}
            className="form-control mb-3"
          />
          {submitted && (
            <span>
              {isAnswerCorrect() ? (
                <FaCheckCircle className="text-success ms-2" />
              ) : (
                <FaTimesCircle className="text-danger ms-2" />
              )}
            </span>
          )}
        </div>
      ) : (
        question.choices.map((choice) => (
          <div key={choice} className="d-flex align-items-center mb-2">
            <input
              type="radio"
              name={`question-${index}`}
              value={choice}
              checked={selectedOptions.includes(choice)}
              onChange={(e) => handleOptionChange(choice, e.target.checked)}
              disabled={submitted}
              className="me-2"
            />
            <label>{choice}</label>
            {submitted && selectedOptions.includes(choice) && (
              <span className="ms-2">
                {question.correctAnswer.includes(choice) ? (
                  <FaCheckCircle className="text-success" />
                ) : (
                  <FaTimesCircle className="text-danger" />
                )}
              </span>
            )}
          </div>
        ))
      )}
      <button
        onClick={navigateToNext}
        disabled={submitted}
        className="btn btn-primary mt-2"
      >
        Next
      </button>
    </div>
  );
}
