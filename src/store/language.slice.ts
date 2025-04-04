import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface languageSlice {
    language: string;
}

const initialState:languageSlice ={
    language:'en'
} 

const languageSlices = createSlice({
     name:"language",
     initialState,
     reducers:{
        setLanguage:(state,action:PayloadAction<string>) =>{
            state.language = action.payload
        }
     }

})

export const {setLanguage} = languageSlices.actions;
export const  languageReducer= languageSlices.reducer;