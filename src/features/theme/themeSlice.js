/* eslint-disable no-param-reassign */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme: 'dark'
};

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        updateTheme: (state, action) => {
            state.theme = action.payload;
        },
    }
});

export default themeSlice.reducer;
export const { updateTheme } = themeSlice.actions;