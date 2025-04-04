import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Todo{
    id:number,
    text:string,
    completed:boolean
}

interface TodoState  {
    todos:Todo[];
}

const initialState:TodoState ={
  todos:[],
}


export const todoSlice = createSlice({
    name:"todos",
    initialState,
    reducers:{
        addTodo:(state:any,action:PayloadAction<string>) => {
            state.todos.push({
                id:Date.now(),
                text:action.payload,
                completed:false
            });
        },
        toggleTodo:(state:any,action:PayloadAction<number>) => {
            const todo = state.todo.find((t:any)=>t.id === action.payload);
            if(todo) todo.completed = !todo.completed  
        },
        deleteTodo:(state:any,action:PayloadAction<number>) => {
            state.todos = state.todos.filter((t:any)=> t.id = !action.payload);
        },
    },
});

export const {addTodo,toggleTodo,deleteTodo} = todoSlice.actions;
export const todoReducer = todoSlice.reducer;