import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  createUserApi,
  deleteUserApi,
  fetchDashbaordApi,
  fetchUsersApi,
  getUserApi,
  getUsersApi,
  updateUserApi,
} from "../../api/userApi";

import type { CreateUserRequest, UpdateUserRequest } from "./userTypes";

export const getUsers = createAsyncThunk(
  "users/getUsers",
  async (
      params : {
      page: number;
      search: string;
      role: string;
    }, { rejectWithValue }) => {
    try {
      return await getUsersApi(params);
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch users"
      );
    }
  }
);

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchUsersApi();
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch user"
      );
    }
  }
);

export const getUser = createAsyncThunk(
  "users/getUser",
  async (id: string, { rejectWithValue }) => {
    try {
      return await getUserApi(id);
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch user"
      );
    }
  }
);

export const createUser = createAsyncThunk(
  "users/createUser",
  async (
    data: CreateUserRequest,
    { rejectWithValue }
  ) => {
    try {
      return await createUserApi(data);
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to create user"
      );
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id: string, { rejectWithValue }) => {
    try {
      await deleteUserApi(id);
      return id;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete user"
      );
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (
    {
      id,
      data,
    }: {
      id: string;
      data: UpdateUserRequest;
    },
    { rejectWithValue }
  ) => {
    try {
      return await updateUserApi(id, data);
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update user"
      );
    }
  }
);

export const fetchDashbaord = createAsyncThunk(
  "users/fetchDashbaord",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchDashbaordApi();
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch dashbaord"
      );
    }
  }
);