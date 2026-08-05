import type { CreateUserRequest } from "../features/users/userTypes";
import api from "./axios";

export const getUsersApi = async () => {

  const response = await api.get(
    "/users"
  );
  console.log("response",response);
  
  return response.data;

};

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
  data:any
)=>{

  const response = await api.patch(
    `/users/edit/${id}`,
    data
  );

  return response.data;

};