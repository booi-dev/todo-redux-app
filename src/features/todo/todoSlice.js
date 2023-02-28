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
        reset: (state, action) => {
            state.todos = action.payload;
        },
        add: (state, action) => {
            state.todos.push(action.payload);
        },
        remove: (state, action) => {
            state.todos = state.todos.filter((t) => t.id !== action.payload.id);
        },
        update: (state, action) => {
            state.todos = state.todos.map((t) => {
                if (t.id === action.payload.id) {
                    return action.payload;
                }
                return t;
            });
        },
        toggleComplete: (state, action) => {
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
        // clearTodo: (state) => {
        //     state.todos = [];
        // },
    }
});

export default todoSlice.reducer;
export const { reset, add, update, remove, toggleComplete, updateNote } = todoSlice.actions;