import { createAsyncThunk } from "@reduxjs/toolkit";
import { createUserApi, deleteUserApi, getUserApi, getUsersApi, updateUserApi } from "../../api/userApi";
import type { CreateUserRequest } from "./userTypes";

export const getUsers =
createAsyncThunk(
  "users/getUsers",
  async () => {

    return await getUsersApi();

  }
);

export const getUser =
createAsyncThunk(
  "users/getUser",
  async (id: string) => {
console.log(id);

    return await getUserApi(id);

  }
);

export const createUser =
createAsyncThunk(
  "users/createUser",
  async(data:CreateUserRequest)=>{

    return await createUserApi(data);

  }
);



export const deleteUser =
createAsyncThunk(
 "users/deleteUser",
 async(id:string)=>{

   await deleteUserApi(id);

   return id;

 }
);

export const updateUser =
createAsyncThunk(
 "users/updateUser",
 async(
   {
    id,
    data
   }:{
    id:string;
    data:any;
   }
 )=>{

   return await updateUserApi(
    id,
    data
   );

 }
);