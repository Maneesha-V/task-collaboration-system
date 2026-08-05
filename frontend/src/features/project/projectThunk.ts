import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getProjectsApi,
  getProjectApi,
  createProjectApi,
  updateProjectApi,
  deleteProjectApi,
} from "../../api/projectApi";

import type {
  CreateProjectRequest,
  UpdateProjectRequest,
} from "./projectTypes";

export const getProjects = createAsyncThunk(
  "projects/getProjects",
  async () => {
    return await getProjectsApi();
  }
);

export const getProject = createAsyncThunk(
  "projects/getProject",
  async (id: string) => {
    return await getProjectApi(id);
  }
);

export const createProject = createAsyncThunk(
  "projects/createProject",
  async (data: CreateProjectRequest) => {
    return await createProjectApi(data);
  }
);

export const updateProject = createAsyncThunk(
  "projects/updateProject",
  async ({
    id,
    data,
  }: {
    id: string;
    data: UpdateProjectRequest;
  }) => {
    return await updateProjectApi(id, data);
  }
);

export const deleteProject = createAsyncThunk(
  "projects/deleteProject",
  async (id: string) => {
    await deleteProjectApi(id);
    return id;
  }
);