import { injectable } from "inversify";
import { ITaskRepository } from "../interfaces/ITaskRepository";
import { ITask, Task } from "../models/Task";

@injectable()
export class TaskRepository implements ITaskRepository {

  async create(data: Partial<ITask>): Promise<ITask> {
    return await Task.create(data);
  }

  async findAll(query: any): Promise<ITask[]> {
    const {
  page = 1,
  limit = 10,
  status,
  priority,
  project,
  sort,
} = query;
const filter: any = {};
if (status) {
  filter.status = status;
}
if (priority) {
  filter.priority = priority;
}
if (project) {
  filter.project = project;
}
    return await Task.find(filter)
      .populate("project", "title")
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email")
      .sort(sort || "-createdAt")
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();
    }

  async findById(id: string): Promise<ITask | null> {
    return await Task.findById(id)
      .populate("project", "title")
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email");
  }

  async update(
    id: string,
    data: Partial<ITask>
  ): Promise<ITask | null> {
    return await Task.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
        runValidators: true,
      }
    );
  }

  async delete(id: string): Promise<void> {
    await Task.findByIdAndDelete(id);
  }
}