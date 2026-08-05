import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi } from "../../api/authApi";
import type { LoginRequest } from "./authTypes";

export const login = createAsyncThunk(
  "auth/login",
  async (data: LoginRequest, thunkAPI) => {
    try {
      return await loginApi(data);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);