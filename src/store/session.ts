import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SessionState {
    isAuthenticated:boolean;
    user: string | null;
}

const initialState: SessionState = {
    isAuthenticated: !!localStorage.getItem('token'),
    user: localStorage.getItem('user') ?? null,
  };
  

const sessionSlice = createSlice({
    name:'session',
    initialState,
    reducers:{
     
      setSession(state, action: PayloadAction<{ uid: string, email: string }>) {
        state.isAuthenticated = true;
        state.user = action.payload.uid;
        localStorage.setItem('token', 'some_token');
        localStorage.setItem('user', action.payload.uid);
      },
          
          clearSession(state) {
            state.isAuthenticated = false;
            state.user = null;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
          }
    }
});
export const {setSession,clearSession} = sessionSlice.actions;
export const sessionReducer= sessionSlice.reducer;