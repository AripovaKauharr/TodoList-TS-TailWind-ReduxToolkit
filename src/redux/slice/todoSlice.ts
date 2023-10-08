import { createSlice } from "@reduxjs/toolkit";
import { getTodoThunk } from "./todoThunk";

export interface Todos {
  title: string;
  id: string;
  complate: boolean;
  date: string;
}
type StateType = {
  isLoading: boolean;
  todos: Todos[];
};

const initialState: StateType = {
  todos: [],
  isLoading: false,
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getTodoThunk.fulfilled, (state, { payload }) => {
        state.todos = payload;
        state.isLoading = false;
      })
      .addCase(getTodoThunk.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(getTodoThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
      });
  },
});

export default todoSlice;
