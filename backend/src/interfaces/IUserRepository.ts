import { IUser } from "../models/User";

export interface IUserRepository {
  create(user: Partial<IUser>): Promise<IUser>;

  findByEmail(email: string): Promise<IUser | null>;

  findById(id: string): Promise<IUser | null>;
  updateRefreshToken(
    userId:string,
    refreshToken:string | null
  ):Promise<void>;
  findAll():Promise<IUser[]>;
  deleteById(id:string):Promise<void>;
  update(
      id: string,
      data: Partial<IUser>
  ): Promise<IUser | null>;
}