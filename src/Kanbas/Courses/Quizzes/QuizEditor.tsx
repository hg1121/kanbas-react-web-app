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
    // console.log(courseId, quizId);
    
    const [quiz, setQuiz ]= useState(location.state?.quiz || location.state?.selectedQuiz);
    const [editing, setEditing] = useState(location.state?.editing)

    useEffect(() => {
        // // Fetch the quiz data
        // const fetchQuiz = async () => {
        //     try {
        //         const quizData = await QuizClient.fetchQuiz(courseId, quizId);
        //         setQuiz(quizData); // Set the quiz data after fetching
        //     } catch (error) {
        //         console.error("Error fetching quiz", error);
        //     }
        // };

        // fetchQuiz(); // Call the function to fetch quiz data
    }, [courseId, quizId]); // Re-run this effect if courseId or quizId changes

    const saveQuiz = async () => {
        try {
            await axios.put(`/api/courses/${courseId}/quizzes/${quizId}`, quiz);
            setEditing(false); // Disable editing
        } catch (error) {
            console.error("Error saving quiz", error);
        }
    };

    return (
        <div>
            <h1>{editing ? "Edit Quiz" : quiz.title}</h1>
            {editing ? (
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
                    <button onClick={() => setEditing(true)}>Edit</button>
                </div>
            )}
        </div>
    );
}