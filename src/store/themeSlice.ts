import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    theme:"light"
}


export const ThemeToggle = createSlice({
    name:"Theme",
    initialState,
    reducers:{
        toggleTheme: (state) => {
            state.theme = state.theme === "light" ? "dark" :"light"
        },
    },
});

export const {toggleTheme} = ThemeToggle.actions;
export const toggleReducer = ThemeToggle.reducer;

