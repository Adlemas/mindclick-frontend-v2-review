/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MembersState } from "@/types/redux";
import { GetMembersPayload, GetMembersResponse } from "@/types/api/members";
import getMembers from "@/api/members/getMembers";
import handleAxiosError from "@/utils/handleAxiosError";
import type { RootState } from "@/redux/store";

export const LOAD_MEMBERS_SIZE = 15;

const initialState: MembersState = {
  query: "",
  records: [],
  loading: false,
  page: 1,
  totalCount: 0,
  totalPages: 0,
};

export const getMembersAction = createAsyncThunk<
  GetMembersResponse,
  GetMembersPayload,
  { state: RootState }
>("members/getMembers", async (params, { rejectWithValue, getState }) => {
  try {
    const membersState = getState().members;
    const { query } = membersState;
    return await getMembers({
      ...params,
      query,
    });
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
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
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
      state.page = action.payload.page;
    });
    builder.addCase(getMembersAction.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { resetMembers, setQuery } = membersSlice.actions;

export default membersSlice.reducer;
