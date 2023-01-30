/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthState } from "@/types/redux";
import { LoginPayload, LoginResponse } from "@/types/api/auth";
import login from "@/api/auth/login";
import handleAxiosError from "@/utils/handleAxiosError";

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  loading: false,
};

export const loginAction = createAsyncThunk<LoginResponse, LoginPayload>(
  "auth/loginAction",
  async (payload, { rejectWithValue }) => {
    try {
      return await login(payload);
    } catch (err) {
      handleAxiosError(err);
      return rejectWithValue(err);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(loginAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginAction.fulfilled, (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
      state.loading = false;
    });
    builder.addCase(loginAction.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { resetAuthState } = authSlice.actions;

export default authSlice.reducer;
