import { createSlice } from "@reduxjs/toolkit";
import { enrollments } from "./Database";

const initialState = {
    enrollments: enrollments,
}

const enrollmentsSlice = createSlice({
    name: "enrollments",
    initialState,
    reducers: {
        addEnrollment: (state, {payload: enrollment}) => {
            const newEnrollment: any = {
                _id: enrollment._id,
                user: enrollment.user, 
                course: enrollment.course
            }
            state.enrollments = [...state.enrollments, newEnrollment] as any;
        },

        deleteEnrollment: (state, { payload: { userId, cid } }) => {
            console.log(userId, cid);
            state.enrollments = state.enrollments.filter(
              (enrollment) =>
                !(enrollment.user === userId && enrollment.course === cid)
            );
        },

    }
})

export const {addEnrollment, deleteEnrollment} = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;