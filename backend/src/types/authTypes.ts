import { UserRole } from "../constants/roles";

export type AuthUser = {
    userId: string;
    role: UserRole
}
export interface PaginatedQuery {
  page?: string;
  limit?: string;
  search?: string;
  role?: string;
  sort?: string;
  status?: string;
  priority?: string;
  project?: string;
}