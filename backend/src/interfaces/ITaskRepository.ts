import { ITask } from "../models/Task";

export interface ITaskRepository {
  create(data: Partial<ITask>): Promise<ITask>;

  findAll(query: any): Promise<ITask[]>;

  findById(id: string): Promise<ITask | null>;

  update(
    id: string,
    data: Partial<ITask>
  ): Promise<ITask | null>;

  delete(id: string): Promise<void>;
}