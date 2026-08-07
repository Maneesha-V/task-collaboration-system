export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}


export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  role?: string;
}