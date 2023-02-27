import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    todos: []
};

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.todoTasks.push(action.payload);
        },
        deleteTodo: (state, action) => {
            state.todoTasks.filter((task) => task.id !== action.payload.id);
        }
    }
});

export default todoSlice.reducer;
export const { addTodo, deleteTodo } = todoSlice.actions;