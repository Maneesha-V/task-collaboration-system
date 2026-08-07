import { inject, injectable } from "inversify";
import TYPES from "../types/types";
import { IUserRepository } from "../interfaces/IUserRepository";
import bcrypt from "bcrypt";
import { ApiError } from "../utils/ApiError";
import { toUserResponseDto } from "../dto/auth/user.dto";
import { CreateUserInput, UpdateUserInput } from "../validators/user.validator";
import { IProjectRepository } from "../interfaces/IProjectRepository";
import { ITaskRepository } from "../interfaces/ITaskRepository";
import { AuthUser, PaginatedQuery } from "../types/authTypes";
import { toAssignedTaskResponseDto } from "../dto/task/task.dto";

@injectable()
export class UserService {
  constructor(
    @inject(TYPES.UserRepository)
    private readonly userRepository: IUserRepository,
    @inject(TYPES.ProjectRepository)
    private readonly projectRepository: IProjectRepository,
    @inject(TYPES.TaskRepository)
    private readonly taskRepository: ITaskRepository,
  ) {}

  async getUsers(id: string, query: PaginatedQuery) {
    return await this.userRepository.findAll(id, query);
  }
  async fetchUsers() {
    return await this.userRepository.findAllUsers();
  }
  async createUser(data: CreateUserInput) {
    console.log({ data });

    const { email, password } = data;
    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
      throw new ApiError(409, "Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userRepository.create({
      ...data,
      password: hashedPassword,
    });
    return toUserResponseDto(user);
  }

  async deleteUser(id: string) {
    console.log(id);

    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    await this.userRepository.deleteById(id);
  }
  async updateUser(id: string, data: UpdateUserInput) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new ApiError(404, "User not found");
    }
    if (data.email) {
      const existingUser = await this.userRepository.findByEmail(data.email);

      if (existingUser && existingUser._id.toString() !== id) {
        throw new ApiError(409, "Email already exists");
      }
    }

    return await this.userRepository.update(id, data);
  }
  async getUser(id: string) {
    console.log(id);

    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    return user;
  }
  async fetchDashboard(user: AuthUser) {
    const totUsers = await this.userRepository.countAllUsers();
    const { totalProjects, totalManagerProjects, totalCompletedProjects } =
      await this.projectRepository.countAllProjects(user);
    const totTasks = await this.taskRepository.countAllTasks(user);
    const assignedTasksRepo = await this.taskRepository.getUserTasks(user);
    const assignedTasks = assignedTasksRepo.map(toAssignedTaskResponseDto);
    return {
      totUsers,
      totalProjects,
      totalManagerProjects,
      totTasks,
      totalCompletedProjects,
      assignedTasks,
    };
  }
}
