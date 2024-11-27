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
    console.log(question.type);
  return (
    <div className="card text-center text-muted">
      <div className="card-header d-flex justify-content-between">
        <p>Question {index + 1}</p>
        <p>{question.points} pts</p>
      </div>

      <div className="card-body">
        {/* <h5 className="card-title">Special title treatment</h5> */}
        <p className="card-text">{question.questionDescription}</p>
        {question.choices.map((choice, index) => (
          <div className="d-flex align-center">
            <hr />
            <input type={question.type === "True/False" ? "radio": "checkbox"} className="me-2 mb-3"/>
            <p key={index}>{choice}</p>
          </div>
        ))}
        <button
          onClick={navigateToNext}
          className="btn btn-success float-end rounded-1"
          disabled={!navigateToNext}
        >
          Next Question
        </button>
      </div>
      {/* <div className="card-footer text-muted">2 days ago</div> */}
    </div>
  );
}
