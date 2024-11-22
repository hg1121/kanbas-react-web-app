import { createSlice } from "@reduxjs/toolkit";
import { assignments } from "../../Database";

const initialState = {
    assignments: assignments,
}

const assignmentsSlice = createSlice({
    name: "assignments",
    initialState,
    reducers: {
        addAssignment: (state, {payload: assignment}) => {
            const newAssignment: any = {
                _id: assignment._id,
                title: assignment.title,
                description: assignment.description,
                course: assignment.course,
                available: assignment.available,
                due: assignment.due,
                until: assignment.until,
                points: assignment.points
            } 
            state.assignments = [...state.assignments, newAssignment] as any;
        },

        deleteAssignment: (state, {payload: aid}) => {
            state.assignments = state.assignments.filter(
                (a: any) => a._id !== aid);
        },

        updateAssignment: (state, {payload: assignment}) => {
            state.assignments = state.assignments.map((a: any) => 
                a._id === assignment._id ? assignment: a
            ) as any;
        }
    }
})

export const {addAssignment, deleteAssignment, updateAssignment} = assignmentsSlice.actions;
export default assignmentsSlice.reducer;