import { injectable } from "inversify";
import { ITaskRepository } from "../interfaces/ITaskRepository";
import { AssignedTaskResponse, ITask, Task, TaskListResponse } from "../models/Task";
import mongoose from "mongoose";
import { AuthUser, PaginatedQuery } from "../types/authTypes";

@injectable()
export class TaskRepository implements ITaskRepository {
  async create(data: Partial<ITask>): Promise<ITask> {
    return await Task.create(data);
  }

  async findAll(id: string, query: PaginatedQuery): Promise<TaskListResponse> {
    console.log("query", query);

    const {
      page = 1,
      limit = 10,
      search,
      status,
      priority,
      project,
      sort,
    } = query;

    const filter: Record<string, unknown> = {};
    if (id) {
      filter.createdBy = id;
    }
    if (search) {
      filter.title = {
        $regex: search,
        $options: "i",
      };
    }
    if (status) {
      filter.status = status;
    }
    if (priority) {
      filter.priority = priority;
    }
    if (project) {
      filter.project = project;
    }

    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const total = await Task.countDocuments(filter);

    const tasks = await Task.find(filter)
      .populate("project", "title")
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email")
      .sort(sort || "-createdAt")
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber)
      .lean();

    return {
      tasks,
      total,
      page: pageNumber,
      totalPages: Math.ceil(total / limitNumber),
    };
  }

  async findById(id: string): Promise<ITask | null> {
    return await Task.findById(id)
      .populate("project", "title")
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email");
  }

  async update(id: string, data: Partial<ITask>): Promise<ITask | null> {
    return await Task.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  async delete(id: string): Promise<void> {
    await Task.findByIdAndDelete(id);
  }
  async countAllTasks(user: AuthUser): Promise<number> {
    const totalManagerTasks = await Task.countDocuments({
      createdBy: user.userId,
    });

    return totalManagerTasks;
  }
  async getUserTasks(user: AuthUser): Promise<ITask[]> {
    const assignedTasks = await Task.find({
      assignedTo: new mongoose.Types.ObjectId(user.userId),
    })
      .populate("project", "title")
      .populate("createdBy", "name");
    return assignedTasks;
  }
}
