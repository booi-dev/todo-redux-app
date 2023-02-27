import { createSlice } from "@reduxjs/toolkit";

const dataList = [];
Object.values(localStorage).forEach((d) => {
    dataList.push(JSON.parse(d));
});

const initialState = {
    todos: dataList || [],
};


// toggleComplete 
// updateTodo or updateNote 
// clearAll

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.todos.push(action.payload);
        },
        deleteTodo: (state, action) => {
            /* eslint-disable-next-line */
            state.todos = [] = state.todos.filter((t) => t.id !== action.payload.id);
        },
        clearTodo: (state) => {
            /* eslint-disable-next-line */
            state.todos = []
        },

    }
});

export default todoSlice.reducer;
export const { addTodo, deleteTodo, clearTodo } = todoSlice.actions;