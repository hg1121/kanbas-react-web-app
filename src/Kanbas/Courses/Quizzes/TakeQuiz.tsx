import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import * as QuizClient from "./client";

export default function TakeQuiz() {
  const location = useLocation();
  const pathSegments = location.pathname.split("/"); // Split path by "/"
  const courseId = pathSegments[3];
  const quizId = pathSegments[5];

  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const [quiz, setQuiz] = useState<any | null>(null);
  const [answers, setAnswers] = useState<any[]>([]);
  const [score, setScore] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleOptionChange = (
    questionIndex: number,
    option: string,
    isChecked: boolean
  ) => {
    setAnswers((prevAnswers: any) =>
      prevAnswers.map((ans: any, index: number) =>
        index === questionIndex
          ? {
              ...ans,
              questionIndex: index,
              selectedOptions: isChecked
                ? [...ans.selectedOptions, option]
                : ans.selectedOptions.filter((opt: string) => opt !== option),
            }
          : ans
      )
    );
  };

  const handleFillInTheBlankChange = (index: number, value: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = {questionIndex: index, selectedOptions: [value]};
    setAnswers(updatedAnswers);
  };

  const handleSubmit = async () => {
    try {
      const response = await QuizClient.submitAttempt(
        courseId,
        quizId,
        currentUser._id,
        answers
      );
      // console.log("response", response.score);
      setScore(response.score);
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const fetchedQuiz = await QuizClient.fetchQuiz(courseId, quizId);
        setQuiz(fetchedQuiz);

        // Initialize answers based on question index
        const initialAnswers = fetchedQuiz.questions.map(() => ({
          selectedOptions: [],
        }));
        setAnswers(initialAnswers);
      } catch (error) {
        console.error("Error fetching quiz:", error);
      }
    };

    fetchQuiz();
  }, [courseId, quizId]);

  if (!quiz) return <p>Loading...</p>;

  return (
    <div className="d-flex justify-content-center align-items-center" >
      <div>
        <h2>{quiz.title}</h2>
        <hr />
        {quiz.questions.map((q: any, index: number) => (
          <div key={index}>
            <p className="text-danger">{q.title}</p>
            <p>{q.questionDescription.replaceAll(/<\/?p[^>]*>/g, "")}</p>
            {q.type === "Fill In the Blank" ? (
              <input type="text"  disabled={submitted}
              onChange={(e) =>
                  handleFillInTheBlankChange(index, e.target.value)
                }
              />
            ) : (
              q.choices.map((choice: string) => (
                <div key={choice}>
                  <input
                    type={
                      q.type === "Multiple Choice"
                        ? "checkbox"
                        : q.type === "True/False"
                        ? "radio"
                        : "text"
                    }
                    name={`question-${index}`} // Use index to group options
                    value={choice}
                    onChange={(e) =>
                      handleOptionChange(index, choice, e.target.checked)
                    }
                    disabled={submitted}
                  />
                  <label className="ms-2">{choice}</label>
                </div>
              ))
            )}
            < hr />
          </div>
        ))}
        <button className = "btn btn-danger rounded-1" onClick={handleSubmit}>Submit</button>
        < br />
        {score !== null && <p className="fs-5"> Your score: <strong className="text-danger"> {score} </strong></p>}
      </div>
    </div>
  );
}
