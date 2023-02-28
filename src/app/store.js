import { configureStore } from "@reduxjs/toolkit";

import todoReducer from '../features/todo/todoSlice';

const store = configureStore({
    reducer: {
        todoStore: todoReducer,
    }
});

export default store;