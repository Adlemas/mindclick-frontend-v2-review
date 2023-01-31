/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MembersState } from "@/types/redux";
import { GetMembersPayload, GetMembersResponse } from "@/types/api/members";
import getMembers from "@/api/members/getMembers";
import handleAxiosError from "@/utils/handleAxiosError";

export const LOAD_MEMBERS_SIZE = 10;

const initialState: MembersState = {
  records: [],
  loading: false,
  page: 1,
  totalCount: 0,
  totalPages: 0,
};

export const getMembersAction = createAsyncThunk<
  GetMembersResponse,
  GetMembersPayload
>("members/getMembers", async (params, { rejectWithValue }) => {
  try {
    return await getMembers(params);
  } catch (e) {
    handleAxiosError(e);
    return rejectWithValue(e);
  }
});

const membersSlice = createSlice({
  name: "members",
  initialState,
  reducers: {
    resetMembers: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getMembersAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getMembersAction.fulfilled, (state, action) => {
      state.loading = false;
      state.records = action.payload.records;
      state.totalCount = action.payload.totalCount;
      state.totalPages = action.payload.totalPages;
    });
    builder.addCase(getMembersAction.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { resetMembers } = membersSlice.actions;

export default membersSlice.reducer;
