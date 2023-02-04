/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { message } from "antd";
import { MembersState } from "@/types/redux";
import { GetMembersPayload, GetMembersResponse } from "@/types/api/members";
import getMembers from "@/api/members/getMembers";
import handleAxiosError from "@/utils/handleAxiosError";
import type { RootState } from "@/redux/store";
import createMember, {
  CreateMemberPayload,
  CreateMemberResponse,
} from "@/api/members/createMember";

export const LOAD_MEMBERS_SIZE = 15;

const initialState: MembersState = {
  query: "",
  records: [],
  loading: false,
  creating: false,
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

export const createMemberAction = createAsyncThunk<
  CreateMemberResponse,
  CreateMemberPayload,
  {
    state: RootState;
  }
>("members/createMember", async (payload, { rejectWithValue, dispatch }) => {
  try {
    const response = await createMember(payload);

    if (response) {
      dispatch(
        getMembersAction({
          query: "",
          page: 1,
          size: LOAD_MEMBERS_SIZE,
        })
      );
    }

    return response;
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

    builder.addCase(createMemberAction.pending, (state) => {
      state.creating = true;
    });
    builder.addCase(createMemberAction.fulfilled, (state, action) => {
      state.creating = false;
      // eslint-disable-next-line no-underscore-dangle
      if (action.payload._id) {
        message.success("Ученик успешно добавлен");
      }
    });
    builder.addCase(createMemberAction.rejected, (state) => {
      state.creating = false;
    });
  },
});

export const { resetMembers, setQuery } = membersSlice.actions;

export default membersSlice.reducer;
