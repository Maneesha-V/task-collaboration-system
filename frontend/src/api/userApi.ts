import type { CreateUserRequest, UpdateUserRequest } from "../features/users/userTypes";
import api from "./axios";

export const getUsersApi = async (
    params: {
    search?: string;
    role?: string;
    page?: number;
  }
) => {

  const response = await api.get(
    "/users",{
      params
    }
  );
  console.log("response",response);
  
  return response.data;

};

export const fetchUsersApi = async () => {
  const response = await api.get("/users/all-users")
  return response.data;
}
export const getUserApi = async (id: string) => {

  const response = await api.get(
    `/users/edit/${id}`
  );
  console.log("response",response);
  
  return response.data;

};

export const createUserApi = async (
  data: CreateUserRequest
) => {

  const response = await api.post(
    "/users",
    data
  );
  console.log("response",response);
  
  return response.data;

};


export const deleteUserApi = async (
  id:string
) => {

  const response = await api.delete(
    `/users/${id}`
  );

  return response.data;

};

export const updateUserApi = async (
  id:string,
  data:UpdateUserRequest
)=>{

  const response = await api.patch(
    `/users/edit/${id}`,
    data
  );

  return response.data;

};
export const fetchDashbaordApi = async () => {
  const response = await api.get("/users/dashboard");
  return response.data;
}