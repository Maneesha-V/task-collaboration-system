import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getTasksApi,
  getTaskApi,
  createTaskApi,
  updateTaskApi,
  deleteTaskApi,
} from "../../api/taskApi";
import type { CreateTaskInput, UpdateTaskInput } from "./taskTypes";


export const getTasks = createAsyncThunk(
  "tasks/getTasks",
  async () => {
    return await getTasksApi();
  }
);

export const getTask = createAsyncThunk(
  "tasks/getTask",
  async (id: string) => {
    return await getTaskApi(id);
  }
);

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (data: CreateTaskInput) => {
    return await createTaskApi(data);
  }
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({
    id,
    data,
  }: {
    id: string;
    data: UpdateTaskInput;
  }) => {
    return await updateTaskApi(id, data);
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id: string) => {
    return await deleteTaskApi(id);
  }
);