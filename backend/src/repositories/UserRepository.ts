import { injectable } from "inversify";
import User, { IUser } from "../models/User";
import { IUserRepository } from "../interfaces/IUserRepository";

@injectable()
export class UserRepository implements IUserRepository {

  async create(user: Partial<IUser>): Promise<IUser> {
    return await User.create(user);
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email });
  }

  async findById(id: string): Promise<IUser | null> {
    return await User.findById(id);
  }
  async updateRefreshToken(
    userId:string,
    refreshToken:string | null
  ):Promise<void> {
    await User.findByIdAndUpdate(userId,{
      refreshToken
    });
  }
  async findAll(){

    return await User.find()
    .select("-password -refreshToken");

  }


async deleteById(id:string){

  await User.findByIdAndDelete(id);

}
 async update(
    id: string,
    data: Partial<IUser>
  ): Promise<IUser | null> {
    return await User.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
        runValidators: true,
      }
    );
  }
}