import { configureStore } from "@reduxjs/toolkit";
import { languageReducer } from "./language.slice";
import { counterReducer } from "./counter.slice";
import { toggleReducer } from "./themeSlice";
import { todoReducer } from "./todoSlice";
import { cartReducer } from "./cartslice";
import { sessionReducer } from "./session";

const store = configureStore({
    reducer:{
        language: languageReducer,
        counter:counterReducer,
        theme:toggleReducer,
        todo: todoReducer,
        cart:cartReducer,
        session:sessionReducer
    }
})

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;


export { store };
export type { AppDispatch, RootState };
