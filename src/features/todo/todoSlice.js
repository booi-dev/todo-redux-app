import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    todoTasks: []
};

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.todoTasks.push(action.payload);
        },
        deleteTask: (state, action) => {
            state.todoTasks.filter((task) => task.id !== action.payload.id);
        }
    }
});

export default todoSlice.reducer;
export const { addTask, deleteTask } = todoSlice.actions;