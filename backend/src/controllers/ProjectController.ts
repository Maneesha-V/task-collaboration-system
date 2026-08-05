import { inject, injectable } from "inversify";
import { Request, Response, NextFunction } from "express";

import TYPES from "../types/types";
import { ProjectService } from "../services/ProjectService";
import { log } from "winston";

@injectable()
export class ProjectController {
  constructor(
    @inject(TYPES.ProjectService)
    private readonly projectService: ProjectService
  ) {}

  createProject = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      console.log(req.body);
      
      const project =
        await this.projectService.createProject(
          req.body,
          req.user!.userId
        );

      res.status(201).json({
        success: true,
        message: "Project created successfully",
        data: project,
      });
    } catch (error) {
      next(error);
    }
  };

  getProjects = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const projects =
        await this.projectService.getProjects();

      res.status(200).json({
        success: true,
        data: projects,
      });
    } catch (error) {
      console.log(error);
      
      next(error);
    }
  };

  getProject = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const project =
        await this.projectService.getProject(
          req.params.id.toString()
        );

      res.status(200).json({
        success: true,
        data: project,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteProject = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await this.projectService.deleteProject(
        req.params.id.toString()
      );

      res.status(200).json({
        success: true,
        message: "Project deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  };
  updateProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {
console.log(req.params,req.user,req.body);

    const project =
      await this.projectService.updateProject(
        req.params.id.toString(),
        req.body,
        req.user!.userId,
        req.user!.role
      );

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: project,
    });

  } catch (error) {
    next(error);
  }

};
}