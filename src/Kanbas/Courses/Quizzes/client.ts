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

export const addQuiz = async(courseId: string, quiz: any) => {
    const {data} = await axios.post(`${COURSES_API}/${courseId}/quizzes/`, quiz);
    return data;
}

export const updateQuiz = async(courseId: string, quizId: string, newQuiz: any) => {
    const {data} = await axios.put(`${COURSES_API}/${courseId}/quizzes/${quizId}`, newQuiz);
    return data;
}

export const deleteQuiz = async(courseId: string, quizId: string) => {
    await axios.delete(`${COURSES_API}/${courseId}/quizzes/${quizId}`);
}