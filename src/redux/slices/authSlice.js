import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null, 
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload; // Update the "user" key, not the entire state
    }
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
