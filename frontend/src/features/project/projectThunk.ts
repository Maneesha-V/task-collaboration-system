import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getProjectsApi,
  getProjectApi,
  createProjectApi,
  updateProjectApi,
  deleteProjectApi,
  fetchProjectsApi,
} from "../../api/projectApi";

import type {
  CreateProjectRequest,
  UpdateProjectRequest,
} from "./projectTypes";

export const getProjects = createAsyncThunk(
  "projects/getProjects",
  async (
    params: {
      search?: string;
      status?: string;
      page?: number;
    },
     { rejectWithValue }) => {
    try {
      return await getProjectsApi(params);
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch projects"
      );
    }
  }
);
export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchProjectsApi();
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch user"
      );
    }
  }
);
export const getProject = createAsyncThunk(
  "projects/getProject",
  async (id: string, { rejectWithValue }) => {
    try {
      return await getProjectApi(id);
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch project"
      );
    }
  }
);

export const createProject = createAsyncThunk(
  "projects/createProject",
  async (
    data: CreateProjectRequest,
    { rejectWithValue }
  ) => {
    try {
      return await createProjectApi(data);
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to create project"
      );
    }
  }
);

export const updateProject = createAsyncThunk(
  "projects/updateProject",
  async (
    {
      id,
      data,
    }: {
      id: string;
      data: UpdateProjectRequest;
    },
    { rejectWithValue }
  ) => {
    try {
      return await updateProjectApi(id, data);
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update project"
      );
    }
  }
);

export const deleteProject = createAsyncThunk(
  "projects/deleteProject",
  async (id: string, { rejectWithValue }) => {
    try {
      await deleteProjectApi(id);
      return id;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete project"
      );
    }
  }
);