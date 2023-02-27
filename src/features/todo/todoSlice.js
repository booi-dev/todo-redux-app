/* eslint-disable no-param-reassign */

import { createSlice } from "@reduxjs/toolkit";

const dataList = [];
Object.values(localStorage).forEach((d) => {
    dataList.push(JSON.parse(d));
});

const initialState = {
    todos: dataList || [],
};

// updateTodo or updateNote 

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.todos.push(action.payload);
        },
        deleteTodo: (state, action) => {
            state.todos = state.todos.filter((t) => t.id !== action.payload.id);
        },
        clearTodo: (state) => {
            state.todos = [];
        },
        toggleComplete: (state, action) => {
            console.log(action.payload);
            state.todos = state.todos.map((t) => {
                if (t.id === action.payload.id) {
                    return {
                        ...t,
                        isComplete: !t.isComplete
                    };
                }
                return t;
            });
        },

    }
});

export default todoSlice.reducer;
export const { addTodo, deleteTodo, clearTodo, toggleComplete } = todoSlice.actions;