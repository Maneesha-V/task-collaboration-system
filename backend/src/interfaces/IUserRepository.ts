import { IUser, UserListResponse } from "../models/User";
import { PaginatedQuery } from "../types/authTypes";

export interface IUserRepository {
  create(user: Partial<IUser>): Promise<IUser>;

  findByEmail(email: string): Promise<IUser | null>;

  findById(id: string): Promise<IUser | null>;
  updateRefreshToken(
    userId:string,
    refreshToken:string | null
  ):Promise<void>;
  findAll(id: string, query: PaginatedQuery):Promise<UserListResponse>;
  findAllUsers(): Promise<IUser[]>
  deleteById(id:string):Promise<void>;
  update(
      id: string,
      data: Partial<IUser>
  ): Promise<IUser | null>;
  countAllUsers(): Promise<number>;
}