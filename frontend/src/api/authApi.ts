import type { LoginRequest, LoginResponse } from "../features/auth/authTypes";
import api from "./axios";

export const loginApi = async (data: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await api.post("/auth/login", data);
    console.log("response", response);
    return response.data;
  } catch (error: any) {
    console.log("Axios Error:", error);
    console.log("Response:", error.response);
    console.log("Message:", error.message);

    throw error;
  }
};
export const refreshTokenApi = async () => {
  const response = await api.post("/auth/refresh-token");
  return response.data;
};

export const logoutApi = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};