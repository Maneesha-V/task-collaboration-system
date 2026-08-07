import { createSlice } from "@reduxjs/toolkit";

import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  fetchProjects,
} from "./projectThunk";

import type { Project } from "./projectTypes";

interface ProjectState {
  projects: Project[];
  project: Project | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProjectState = {
  projects: [],
  project: null,
  loading: false,
  error: null,
};

const projectSlice = createSlice({
  name: "projects",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(getProjects.pending, (state) => {
        state.loading = true;
      })

      .addCase(getProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload.data.projects;
      })

      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload.data;
      })
      .addCase(getProject.fulfilled, (state, action) => {
        state.project = action.payload.data;
      })

      .addCase(createProject.fulfilled, (state, action) => {
        state.projects.push(action.payload.data);
      })

      .addCase(updateProject.fulfilled, (state, action) => {
        const updatedProject = action.payload.data;

        const index = state.projects.findIndex(
          (project) => project._id === updatedProject._id
        );

        if (index !== -1) {
          state.projects[index] = updatedProject;
        }

        state.project = updatedProject;
      })

      .addCase(deleteProject.fulfilled, (state, action) => {
        state.projects = state.projects.filter(
          (project) => project._id !== action.payload
        );
      });
  },
});

export default projectSlice.reducer;