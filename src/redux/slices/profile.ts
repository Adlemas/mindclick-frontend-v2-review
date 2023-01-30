/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { ProfileState } from "@/types/redux";
import getMyProfile from "@/api/profile/getMyProfile";
import handleAxiosError from "@/utils/handleAxiosError";

const initialValues: ProfileState = {
  profile: null,
  loading: false,
};

export const getProfileAction = createAsyncThunk(
  "profile/getProfileAction",
  async (_, { rejectWithValue }) => {
    try {
      return await getMyProfile();
    } catch (err) {
      handleAxiosError(err);
      return rejectWithValue(err);
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: initialValues,
  reducers: {
    resetProfileState: () => initialValues,
  },
  extraReducers: (builder) => {
    builder.addCase(getProfileAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProfileAction.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.loading = false;
    });
    builder.addCase(getProfileAction.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { resetProfileState } = profileSlice.actions;

export default profileSlice.reducer;
