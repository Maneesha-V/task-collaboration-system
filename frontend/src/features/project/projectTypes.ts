export interface Project {
  _id: string;
  title: string;
  description: string;
  manager: {
    _id: string;
    name: string;
    email: string;
  };
}

export interface CreateProjectRequest {
  title: string;
  description: string;
  manager: string;
}

export interface UpdateProjectRequest {
  title?: string;
  description?: string;
  manager?: string;
}