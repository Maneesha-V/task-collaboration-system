import type { CreateTaskInput, UpdateTaskInput } from "../features/task/taskTypes";
import api from "./axios";

export const getTasksApi = async () => {
  const response = await api.get("/tasks");
  return response.data;
};

export const getTaskApi = async (id: string) => {
  const response = await api.get(`/tasks/${id}`);
  return response.data;
};

export const createTaskApi = async (
  data: CreateTaskInput
) => {
    console.log(data);
    
  const response = await api.post(
    "/tasks",
    data
  );

  return response.data;
};

export const updateTaskApi = async (
  id: string,
  data: UpdateTaskInput
) => {
  const response = await api.patch(
    `/tasks/${id}`,
    data
  );

  return response.data;
};

export const deleteTaskApi = async (
  id: string
) => {
  await api.delete(`/tasks/${id}`);

  return id;
};