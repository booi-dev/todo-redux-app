import { createSlice } from "@reduxjs/toolkit";

const dataList = [];
Object.values(localStorage).forEach((d) => {
    dataList.push(JSON.parse(d));
});

const initialState = {
    todos: dataList || [],
};

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.todos.push(action.payload);
        },
        deleteTodo: (state, action) => {
            state.todos.filter((task) => task.id !== action.payload.id);
        }
    }
});

export default todoSlice.reducer;
export const { addTodo, deleteTodo } = todoSlice.actions;