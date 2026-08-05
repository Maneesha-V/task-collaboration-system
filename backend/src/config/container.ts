import "reflect-metadata";
import { Container } from "inversify";

import TYPES from "../types/types";

import { UserRepository } from "../repositories/UserRepository";
import { AuthService } from "../services/AuthService";
import { AuthController } from "../controllers/AuthController";
import { UserService } from "../services/UserService";
import { UserController } from "../controllers/UserController";
import { ProjectRepository } from "../repositories/ProjectRepository";
import { ProjectService } from "../services/ProjectService";
import { ProjectController } from "../controllers/ProjectController";
import { TaskRepository } from "../repositories/TaskRepository";
import { TaskService } from "../services/TaskService";
import { TaskController } from "../controllers/TaskController";

const container = new Container();

// Repository
container
  .bind(TYPES.UserRepository)
  .to(UserRepository);
container
  .bind(TYPES.ProjectRepository)
  .to(ProjectRepository);
container
  .bind(TYPES.TaskRepository)
  .to(TaskRepository);

// Service
container
  .bind(TYPES.AuthService)
  .to(AuthService);
container
  .bind(TYPES.UserService)
  .to(UserService);
container
  .bind(TYPES.ProjectService)
  .to(ProjectService);
container 
  .bind(TYPES.TaskService)
  .to(TaskService);

// Controller
container
  .bind(TYPES.AuthController)
  .to(AuthController);
container
  .bind(TYPES.UserController)
  .to(UserController);
container 
  .bind(TYPES.ProjectController)
  .to(ProjectController);
container 
  .bind(TYPES.TaskController)
  .to(TaskController);

export default container;