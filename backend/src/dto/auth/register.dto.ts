import { UserRole } from "../../constants/roles";

export interface RegisterDto {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}