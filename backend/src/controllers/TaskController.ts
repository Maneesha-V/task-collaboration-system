import { inject, injectable } from "inversify";
import { Request, Response, NextFunction } from "express";

import TYPES from "../types/types";
import { TaskService } from "../services/TaskService";

@injectable()
export class TaskController {
  constructor(
    @inject(TYPES.TaskService)
    private readonly taskService: TaskService
  ) {}

  createTask = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const task = await this.taskService.createTask(
        req.body,
        req.user!.userId
      );

      res.status(201).json({
        success: true,
        message: "Task created successfully",
        data: task,
      });
    } catch (error) {
      next(error);
    }
  };

  getTasks = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const tasks = await this.taskService.getTasks(req.user!.userId,req.query);
      console.log(tasks);
      
      res.json({
        success: true,
        data: tasks,
      });
    } catch (error) {
      next(error);
    }
  };

  getTask = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const task = await this.taskService.getTask(
        req.params.id.toString()
      );

      res.json({
        success: true,
        data: task,
      });
    } catch (error) {
      next(error);
    }
  };

  updateTask = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const task = await this.taskService.updateTask(
        req.params.id.toString(),
        req.body
      );

      res.json({
        success: true,
        message: "Task updated successfully",
        data: task,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteTask = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await this.taskService.deleteTask(req.params.id.toString());

      res.json({
        success: true,
        message: "Task deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  };
}

