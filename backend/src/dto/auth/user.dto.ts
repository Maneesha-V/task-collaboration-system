import { IUser } from "../../models/User";

export interface UserResponseDto {
  id: string;
  name: string;
  email: string;
  role: string;
}

export const toUserResponseDto = (
  user: IUser
): UserResponseDto => ({
  id: user._id.toString(),
  name: user.name,
  email: user.email,
  role: user.role,
});