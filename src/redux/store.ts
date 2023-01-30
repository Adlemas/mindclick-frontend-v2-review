import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/slices/auth";
import profileReducer from "@/redux/slices/profile";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
