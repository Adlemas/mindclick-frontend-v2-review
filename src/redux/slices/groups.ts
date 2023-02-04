/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import { GroupsState } from "@/types/redux";
import type { IGroup } from "@/types/entity";
import handleAxiosError from "@/utils/handleAxiosError";
import getGroups from "@/api/groups/getGroups";
import type {
  CreateGroupPayload,
  CreateGroupResponse,
} from "@/types/api/groups";
import createGroup from "@/api/groups/createGroup";

const initialState: GroupsState = {
  records: [],
  loading: false,
  creating: false,
};

export const getGroupsAction = createAsyncThunk<Array<IGroup>, void>(
  "groups/getGroupsAction",
  async (_, { rejectWithValue }) => {
    try {
      return await getGroups();
    } catch (err) {
      handleAxiosError(err);
      return rejectWithValue(err);
    }
  }
);

export const createGroupAction = createAsyncThunk<
  CreateGroupResponse,
  CreateGroupPayload
>(
  "groups/createGroupAction",
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const response = await createGroup(payload);

      if (response) {
        dispatch(getGroupsAction());
      }

      return response;
    } catch (err) {
      handleAxiosError(err);
      return rejectWithValue(err);
    }
  }
);

const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    resetGroupsState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getGroupsAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getGroupsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.records = action.payload;
    });
    builder.addCase(getGroupsAction.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(createGroupAction.pending, (state) => {
      state.creating = true;
    });
    builder.addCase(createGroupAction.fulfilled, (state, action) => {
      state.creating = false;
      // eslint-disable-next-line no-underscore-dangle
      if (action.payload?._id) {
        message.success("Группа успешно создана");
      }
    });
  },
});

export const { resetGroupsState } = groupsSlice.actions;

export default groupsSlice.reducer;
