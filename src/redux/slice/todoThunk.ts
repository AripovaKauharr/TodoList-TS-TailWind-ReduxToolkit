import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Todos } from "./todoSlice";

export const getTodoThunk = createAsyncThunk(
  "todos/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const result = await axios.get("http://localhost:3003/todo");
      return result.data;
    } catch (error) {
      return error;
    }
  }
);

export const saveTodoThunk = createAsyncThunk(
  "todos/port",
  async (data: Todos, { rejectWithValue, dispatch }) => {
    try {
      const result = await axios.post("http://localhost:3003/todo", data);
      dispatch(getTodoThunk());
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const changeStatusTodoThunk = createAsyncThunk(
  "todos/port",
  async (item: Todos, { rejectWithValue, dispatch }) => {
    try {
      const result = await axios.put(`http://localhost:3003/todo/${item.id}`,item);
      dispatch(getTodoThunk());
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteTodoThunk = createAsyncThunk(
  "todos/post",
  async (id: string, { rejectWithValue, dispatch }) => {
    try {
      const result = await axios.delete(`http://localhost:3003/todo/${id}`);
      dispatch(getTodoThunk());
      return result;
    } catch (error) {   
      return rejectWithValue(error);
    }
  }
);
