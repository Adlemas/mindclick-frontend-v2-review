/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GroupsState } from "@/types/redux";
import { IGroup } from "@/types/entity";
import handleAxiosError from "@/utils/handleAxiosError";

const initialState: GroupsState = {
  records: [],
  loading: false,
};

export const getGroupsAction = createAsyncThunk<Array<IGroup>, void>(
  "groups/getGroupsAction",
  async (_, { rejectWithValue }) => {
    try {
      return [];
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
  },
});

export const { resetGroupsState } = groupsSlice.actions;

export default groupsSlice.reducer;
