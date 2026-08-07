import { injectable } from "inversify";
import User, { IUser, UserListResponse } from "../models/User";
import { IUserRepository } from "../interfaces/IUserRepository";
import { PaginatedQuery } from "../types/authTypes";

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
    userId: string,
    refreshToken: string | null,
  ): Promise<void> {
    await User.findByIdAndUpdate(userId, {
      refreshToken,
    });
  }
  async findAll(id: string, query: PaginatedQuery): Promise<UserListResponse> {
    console.log(query);

    const { page = 1, limit = 10, search, role, sort } = query;

    const filter: Record<string, unknown> = {};

    if (search) {
      filter.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          email: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    if (role) {
      filter.role = role;
    }

    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const total = await User.countDocuments(filter);

    const users = await User.find(filter)
      .select("-password -refreshToken")
      .sort(sort || "-createdAt")
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber)
      .lean();

    return {
      users,
      total,
      page: pageNumber,
      totalPages: Math.ceil(total / limitNumber),
    };

  }
  async findAllUsers(): Promise<IUser[]> {
    return await User.find().select("-password -refreshToken").lean();
  }

  async deleteById(id: string) {
    await User.findByIdAndDelete(id);
  }
  async update(id: string, data: Partial<IUser>): Promise<IUser | null> {
    return await User.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }
  async countAllUsers(): Promise<number> {
    return await User.countDocuments();
  }
}
