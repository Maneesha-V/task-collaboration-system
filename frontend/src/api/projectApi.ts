import type { CreateProjectRequest, UpdateProjectRequest } from "../features/project/projectTypes";
import api from "./axios";

export const getProjectsApi = async (
  params: {
    search?: string;
    status?: string;
    page?: number;
  }
) => {
  const response = await api.get("/projects/",{
    params
  });
  console.log(response);
  
  return response.data;
};
export const fetchProjectsApi = async () => {
  const response = await api.get(`/projects/all-projects`);
  return response.data;
}
export const getProjectApi = async (id: string) => {
  const response = await api.get(`/projects/${id}`);
  console.log(response);
  return response.data;
};

export const createProjectApi = async (
  data: CreateProjectRequest
) => {
  const response = await api.post(
    "/projects/",
    data
  );

  return response.data;
};

export const updateProjectApi = async (
  id: string,
  data: UpdateProjectRequest
) => {
    console.log(data);
    
  const response = await api.patch(
    `/projects/${id}`,
    data
  );

  return response.data;
};

export const deleteProjectApi = async (
  id: string
) => {
  await api.delete(`/projects/${id}`);

  return id;
};