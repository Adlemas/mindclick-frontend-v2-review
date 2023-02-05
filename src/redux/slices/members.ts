/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { message } from "antd";
import { MembersState } from "@/types/redux";
import type {
  CreateMemberPayload,
  CreateMemberResponse,
  GetMembersPayload,
  GetMembersResponse,
  UpdateMemberPayload,
  UpdateMemberResponse,
} from "@/types/api/members";
import getMembers from "@/api/members/getMembers";
import handleAxiosError from "@/utils/handleAxiosError";
import type { RootState } from "@/redux/store";
import createMember from "@/api/members/createMember";
import updateMember from "@/api/members/updateMember";

export const LOAD_MEMBERS_SIZE = 15;

const initialState: MembersState = {
  query: "",
  groupId: null,
  member: null,
  records: [],
  loading: false,
  creating: false,
  updating: false,
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
    const { query, groupId } = membersState;
    return await getMembers({
      ...params,
      query,
      groupId,
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

export const updateMemberAction = createAsyncThunk<
  UpdateMemberResponse,
  UpdateMemberPayload,
  {
    state: RootState;
  }
>("members/updateMember", async (payload, { rejectWithValue, dispatch }) => {
  try {
    const response = await updateMember(payload);

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
  } catch (err) {
    handleAxiosError(err);
    return rejectWithValue(err);
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
    setGroupId: (state, action: PayloadAction<string | null>) => {
      state.groupId = action.payload;
    },
    setMember: (state, action: PayloadAction<MembersState["member"]>) => {
      state.member = action.payload;
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
      if (action.payload?._id) {
        message.success("Ученик успешно добавлен");
      }
    });
    builder.addCase(createMemberAction.rejected, (state) => {
      state.creating = false;
    });

    builder.addCase(updateMemberAction.pending, (state) => {
      state.updating = true;
    });
    builder.addCase(updateMemberAction.fulfilled, (state, action) => {
      state.updating = false;

      // eslint-disable-next-line no-underscore-dangle
      if (action.payload?._id) {
        message.success("Ученик успешно обновлен");
      }
    });
    builder.addCase(updateMemberAction.rejected, (state) => {
      state.updating = false;
    });
  },
});

export const { resetMembers, setQuery, setGroupId, setMember } =
  membersSlice.actions;

export default membersSlice.reducer;
