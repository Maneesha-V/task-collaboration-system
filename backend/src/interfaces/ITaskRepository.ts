import { AssignedTaskResponse, ITask, TaskListResponse } from "../models/Task";
import { AuthUser, PaginatedQuery } from "../types/authTypes";

export interface ITaskRepository {
  create(data: Partial<ITask>): Promise<ITask>;

  findAll(id: string, query: PaginatedQuery): Promise<TaskListResponse>;

  findById(id: string): Promise<ITask | null>;

  update(
    id: string,
    data: Partial<ITask>
  ): Promise<ITask | null>;

  delete(id: string): Promise<void>;
  countAllTasks(user: AuthUser): Promise<number>;
  getUserTasks(user: AuthUser): Promise<ITask[]>
}