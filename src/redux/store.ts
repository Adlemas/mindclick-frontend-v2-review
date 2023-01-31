import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/slices/auth";
import profileReducer from "@/redux/slices/profile";
import membersReducer from "@/redux/slices/members";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    members: membersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
