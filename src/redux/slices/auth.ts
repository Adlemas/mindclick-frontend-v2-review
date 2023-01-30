/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthState } from "@/types/redux";
import { LoginPayload, LoginResponse } from "@/types/api/auth";
import login from "@/api/auth/login";
import handleAxiosError from "@/utils/handleAxiosError";
import {
  getItemFromLocal,
  removeItemFromLocal,
  setItemInLocal,
} from "@/utils/localStorage";
import refresh from "@/api/auth/refresh";

const initialState: AuthState = {
  accessToken: getItemFromLocal("accessToken") || null,
  refreshToken: getItemFromLocal("refreshToken") || null,
  isAuthenticated: false,
  loading: false,
  refreshing: false,
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

export const refreshAction = createAsyncThunk(
  "auth/refreshAction",
  async (_, { rejectWithValue }) => {
    try {
      return await refresh();
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
    logout: () => {
      removeItemFromLocal("accessToken");
      removeItemFromLocal("refreshToken");
      setItemInLocal("isAuthenticated", false);
      return initialState;
    },
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
      setItemInLocal("accessToken", action.payload.accessToken);
      setItemInLocal("refreshToken", action.payload.refreshToken);
      setItemInLocal("isAuthenticated", true);
    });
    builder.addCase(loginAction.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(refreshAction.pending, (state) => {
      state.refreshing = true;
    });
    builder.addCase(refreshAction.fulfilled, (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.refreshing = false;
      state.isAuthenticated = true;
      setItemInLocal("accessToken", action.payload.accessToken);
      setItemInLocal("refreshToken", action.payload.refreshToken);
      setItemInLocal("isAuthenticated", true);
    });
    builder.addCase(refreshAction.rejected, (state) => {
      state.refreshing = false;
    });
  },
});

export const { resetAuthState } = authSlice.actions;

export default authSlice.reducer;
