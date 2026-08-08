import { injectable } from "inversify";
import { ITaskRepository } from "../interfaces/ITaskRepository";
import {
  AssignedTaskResponse,
  ITask,
  Task,
  TaskListResponse,
} from "../models/Task";
import mongoose from "mongoose";
import { AuthUser, PaginatedQuery } from "../types/authTypes";
import User from "../models/User";
import { Project } from "../models/Project";

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
    console.log(search);

    const filter: Record<string, unknown> = {};
    if (id) {
      filter.createdBy = id;
    }
    if (search) {
      const users = await User.find({
        name: {
          $regex: search,
          $options: "i",
        },
      }).select("_id");
      const userIds = users.map((user) => user._id);
      console.log(userIds);
      const projects = await Project.find({
        title: {
          $regex: search,
          $options: "i"
        }
      }).select("_id");
      const projectIds = projects.map((project) => project._id);
      console.log(projectIds);
      
      filter.$or = [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
        {
          assignedTo: {
            $in: userIds,
          },
        },
        {
          project: {
            $in: projectIds
          }
        }
      ];
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
