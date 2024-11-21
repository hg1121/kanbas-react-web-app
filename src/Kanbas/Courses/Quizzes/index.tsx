import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

import * as QuizClient from "./client";
import QuizzesButtons from "./QuizzesButtons";
import { BsGripVertical } from "react-icons/bs";
import { FaCaretDown } from "react-icons/fa";
import { RxRocket } from "react-icons/rx";
import { useSelector } from "react-redux";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";

const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit', 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: false 
    };
    return date.toLocaleString('en-US', options).replace(',', '');
  };

export default function QuizList() {
    const location = useLocation();
    const pathSegments = location.pathname.split('/'); // Split path by "/"
    const courseId = pathSegments[3];
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const [quiz, setQuiz] = useState({});
    const [quizzes, setQuizzes] = useState<any[]>([]);

    const fetchQuizzesForCourse = async() => {
        const newQuizzes = await QuizClient.fetchQuizzes(courseId)
        setQuizzes(newQuizzes);
    }

    // Fetch quizzes on load
    useEffect(() => {
        // const fetchQuizzes = async () => {
        //     try {
        //         const response = await axios.get(`/api/courses/${courseId}/quizzes`);
        //         setQuizzes(response.data);
        //     } catch (error) {
        //         console.error("Error fetching quizzes", error);
        //     }
        // };
        // fetchQuizzes();
        fetchQuizzesForCourse();
    }, [courseId]);

    const deleteQuiz = async (quizId: string) => {
        try {
            await axios.delete(`/api/courses/${courseId}/quizzes/${quizId}`);
            setQuizzes(quizzes.filter(quiz => quiz.id !== quizId)); // Update UI
        } catch (error) {
            console.error("Error deleting quiz", error);
        }
    };

    return (

        // <div>
        //     <QuizzesButtons />
        //     <h1>Quizzes</h1>
        //     <Link to={`/courses/${courseId}/quizzes/new`}>+ Add Quiz</Link>
        //     <ul>
        //         {quizzes.map(quiz => (
        //             <li key={quiz.id}>
        //                 <Link to={`/courses/${courseId}/quizzes/${quiz.id}`}>
        //                     {quiz.title}
        //                 </Link>
        //                 <button onClick={() => deleteQuiz(quiz.id)}>Delete</button>
        //             </li>
        //         ))}
        //     </ul>
        // </div>
        <div id="wd-assignments">
        <QuizzesButtons/>
        <ul id="wd-modules" className="list-group rounded-0 d-flex flex-column">
        <li className="wd-title p-4 ps-2 bg-secondary d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <BsGripVertical className="me-1 fs-3" />
              <FaCaretDown className="me-1 fs-4" />
              <span style={{ fontSize: "24px", fontWeight: "bold" }}>
                Assignment Quizzes
              </span>
            </div>
          </li>
          {quizzes
          .filter((quiz: any) => quiz.courseId === courseId)
          .map((quiz: any, index: any) => (
            <li className="wd-module list-group-item p-3 fs-5 border-gray d-flex justify-content-between align-items-center" key ={index}>
            <span className="d-flex align-items-center">
              <RxRocket className="me-4 fs-3 text-green" />
              <span>
              <h4>
                {currentUser.role === "FACULTY" ? 
                 <Link to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz.quizId}`} className="no-decoration"> {quiz.title}</Link>
                : quiz.title}
                </h4>
                <span>{new Date(quiz.due).getTime() < Date.now() ?  "Closed": "Open"}</span> |{" "}
                <b>Not available until </b>{quiz.availableDate} | <br />
                <b>Due </b>{quiz.dueDate} | {quiz.points} pts
              </span>
            </span>
            <div>
            {/* {currentUser.role === "FACULTY" && <FaTrash className="text-danger me-2 mb-1" onClick={() => {handleDelete(assignment._id)}}/>} */}
            <div className="float-end">
            <GreenCheckmark />
            <IoEllipsisVertical className="fs-4" />
            </div>
            </div>
          </li>
          ))}
        </ul>
      {/* {modalOpen && <MyModal modalOpen = {modalOpen} aid={deleteAid} cid={cid} assignments = {assignments} setAssignments = {setAssignments}/>} */}
      </div>
    );
}