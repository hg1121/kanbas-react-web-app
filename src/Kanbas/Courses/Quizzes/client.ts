import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;

export const fetchQuizzes = async (courseId: string) => {
    const {data} = await axios.get(`${COURSES_API}/${courseId}/quizzes`);
    return data;
}

export const fetchQuiz = async(courseId: string, quizId: string) => {
    const {data} = await axios.get(`${COURSES_API}/${courseId}/quizzes/${quizId}`);
    return data;
}