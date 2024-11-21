import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router";
import * as QuizClient from "./client";

// path={`/${course._id}/Quizzes/:qid`}
export default function QuizEditor() {
    const location = useLocation();
    const pathSegments = location.pathname.split("/"); // Split path by "/"
    const courseId = pathSegments[3];
    const quizId = pathSegments[5];
    console.log(courseId, quizId);
    
    const [quiz, setQuiz] = useState<any>({});
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        setQuiz(QuizClient.fetchQuiz(courseId, quizId));
        console.log(quiz);
    }, [courseId, quizId]);

    const saveQuiz = async () => {
        try {
            await axios.put(`/api/courses/${courseId}/quizzes/${quizId}`, quiz);
            setIsEditing(false); // Disable editing
        } catch (error) {
            console.error("Error saving quiz", error);
        }
    };

    return (
        <div>
            <h1>{isEditing ? "Edit Quiz" : quiz.title}</h1>
            {isEditing ? (
                <div>
                    <input
                        type="text"
                        value={quiz.title}
                        onChange={e => setQuiz({ ...quiz, title: e.target.value })}
                    />
                    <textarea
                        value={quiz.description}
                        onChange={e => setQuiz({ ...quiz, description: e.target.value })}
                    ></textarea>
                    <button onClick={saveQuiz}>Save</button>
                </div>
            ) : (
                <div>
                    <p>{quiz.title}</p>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                </div>
            )}
        </div>
    );
}