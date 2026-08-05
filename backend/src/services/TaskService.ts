import { inject, injectable } from "inversify";

import TYPES from "../types/types";

import { ITaskRepository } from "../interfaces/ITaskRepository";
import { ApiError } from "../utils/ApiError";

@injectable()
export class TaskService {
  constructor(
    @inject(TYPES.TaskRepository)
    private readonly taskRepository: ITaskRepository
  ) {}

  async createTask(data: any, managerId: string) {
    return await this.taskRepository.create({
      ...data,
      createdBy: managerId,
    });
  }

  async getTasks(query: any) {
    return await this.taskRepository.findAll(query);
  }

  async getTask(id: string) {
    const task = await this.taskRepository.findById(id);

    if (!task) {
      throw new ApiError(404, "Task not found");
    }

    return task;
  }

  async updateTask(id: string, data: any) {
    const task = await this.taskRepository.findById(id);

    if (!task) {
      throw new ApiError(404, "Task not found");
    }

    return await this.taskRepository.update(id, data);
  }

  async deleteTask(id: string) {
    const task = await this.taskRepository.findById(id);

    if (!task) {
      throw new ApiError(404, "Task not found");
    }

    await this.taskRepository.delete(id);
  }
}