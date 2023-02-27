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
            console.log('adding to store', action.payload);
            state.todos.push(action.payload);
        },
        deleteTodo: (state, action) => {
            console.log('delete form store', action.payload);
            state.todos = state.todos.filter((t) => t.id !== action.payload.id);
        },
        toggleComplete: (state, action) => {
            console.log('toggle store', action.payload);
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
        updateNote: (state, action) => {
            console.log('update store', action.payload);
            state.todos = state.todos.map((t) => {
                if (t.id === action.payload.id) {
                    return {
                        ...t,
                        note: t.note
                    };
                }
                return t;
            });
        },
        updateTodo: (state, action) => {
            console.log('updating todo', action.payload);
            state.todos = state.todos.map((t) => {
                if (t.id === action.payload.id) {
                    return action.payload;
                }
                return t;
            });
        },
        clearTodo: (state) => {
            console.log('clearing store');
            state.todos = [];
        },
    }
});

export default todoSlice.reducer;
export const { addTodo, deleteTodo, clearTodo, toggleComplete, updateNote, updateTodo } = todoSlice.actions;