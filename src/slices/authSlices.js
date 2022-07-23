import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   infos: [],
   isLog: false,
};

const authSlice = createSlice({
   name: "auth",
   initialState,
   reducers: {

      login(state, action) {
         state.isLog = true;
         state.infos = action.payload;
         state.role = action.payload.status;
      },

      logout(state, action) {
         state.infos = [];
         state.isLog = false;
         localStorage.removeItem('TOKEN');
      },
      update(state, action) {
         state.infos = action.payload;
      }
   }
});


export const { login, logout, update } = authSlice.actions;

export default authSlice.reducer;