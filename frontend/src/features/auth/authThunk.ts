import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi, refreshTokenApi } from "../../api/authApi";
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
export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async(_, thunkAPI) => {
    try {
      return await refreshTokenApi();
    } catch(err: any){
        return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to refresh token"
      );
    }
  }
)