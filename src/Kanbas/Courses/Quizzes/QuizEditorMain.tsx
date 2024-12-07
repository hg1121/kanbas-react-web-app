import { useState } from "react";
import QuizEditorDetail from "./QuizEditorDetail";
import QuizEditorQuestion from "./QuizEditorQuestion";

interface Quiz {
    quizId: string;
    courseId: string;
    title: string;
    quizType: string;
    points: number;
    description:string;
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

interface QuizEditorMainProps {
    editing:boolean;
    setEditing: (value: boolean) => void;
    quiz: Quiz;
    setQuiz: (quiz: Quiz) => void;
  }
  

export default function QuizEditorMain({ editing, setEditing, quiz, setQuiz}: QuizEditorMainProps) {
//   console.log('Edit Page Quiz', quiz);
  const [showDetailPage, setShowDetailPage] = useState(true);
  return (
    <div>
        <hr/>
      <div>
        <button className="btn btn-secondary me-2" onClick={() => setShowDetailPage(true)}>Details</button>
        <button className="btn btn-secondary" onClick={() => setShowDetailPage(false)}>Questions</button>
      </div>
      {showDetailPage ? (
        <QuizEditorDetail
         editing={editing}
         setEditing={setEditing}
         setShowDetailPage={setShowDetailPage}
         quiz={quiz}
         setQuiz = {setQuiz}
        />
      ) : (
        <QuizEditorQuestion quiz={quiz} setQuiz = {setQuiz}/>
      )}
    </div>
  );
}
