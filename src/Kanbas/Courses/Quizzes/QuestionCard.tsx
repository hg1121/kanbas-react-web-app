interface Question {
  title: string;
  type: string;
  points: number;
  questionDescription: string;
  choices: string[];
  correctAnswer: string[];
}
interface QuestionCardProps {
  question: Question;
  index: number;
  navigateToNext: () => void;
}
export default function QuestionCard({
  question,
  index,
  navigateToNext,
}: QuestionCardProps) {
  // console.log(question.type);
  return (
    <div className="card text-center text-muted">
      {question ? (
        <div>
          <div className="card-header d-flex justify-content-between">
            <p>Question {index + 1}</p>
            <p>{question.points} pts</p>
          </div>

          <div className="card-body">
            {/* <h5 className="card-title">Special title treatment</h5> */}
            <p className="card-text">{question.questionDescription.replaceAll(/<\/?p[^>]*>/g, '')}</p>
            {question.type !== "Fill In the Blank" && question.choices.map((choice, index) => (
              <div key={index} className="d-flex align-center">
                <hr />
                <input
                  type={question.type === "True/False" ? "radio" : "checkbox"}
                  className="me-2 mb-3"
                  name={`question-${question.title}`}  
                />
                <p>{choice}</p>
              </div>
            ))}

            {question.type === "Fill In the Blank" && <input type = "text"/>}

            <button
              onClick={navigateToNext}
              className="btn btn-success float-end rounded-1"
              disabled={!navigateToNext}
            >
              Next Question
            </button>
          </div>
        </div>
      ) : (
        <p> Currently, no question added in this quiz.</p>
      )}
    </div>
  );
}
