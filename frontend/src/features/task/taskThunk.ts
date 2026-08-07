import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getTasksApi,
  getTaskApi,
  createTaskApi,
  updateTaskApi,
  deleteTaskApi,
} from "../../api/taskApi";

import type {
  CreateTaskInput,
  UpdateTaskInput,
} from "./taskTypes";

export const getTasks = createAsyncThunk(
  "tasks/getTasks",
  async (
    {
      page,
      search,
      status,
    }: {
      page: number;
      search: string;
      status: string;
    },
    { rejectWithValue }
  ) => {
    try {
      return await getTasksApi(page, search, status);
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch tasks"
      );
    }
  }
);

export const getTask = createAsyncThunk(
  "tasks/getTask",
  async (id: string, { rejectWithValue }) => {
    try {
      return await getTaskApi(id);
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch task"
      );
    }
  }
);

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (
    data: CreateTaskInput,
    { rejectWithValue }
  ) => {
    try {
      return await createTaskApi(data);
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to create task"
      );
    }
  }
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async (
    {
      id,
      data,
    }: {
      id: string;
      data: UpdateTaskInput;
    },
    { rejectWithValue }
  ) => {
    try {
      return await updateTaskApi(id, data);
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update task"
      );
    }
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id: string, { rejectWithValue }) => {
    try {
      return await deleteTaskApi(id);
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete task"
      );
    }
  }
);