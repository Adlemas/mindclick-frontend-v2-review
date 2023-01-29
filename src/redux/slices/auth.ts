import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "@/types/redux";

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  loading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthState: () => initialState,
  },
});

export const { resetAuthState } = authSlice.actions;

export default authSlice.reducer;
