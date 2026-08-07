import { Router } from "express";

import container from "../config/container";
import TYPES from "../types/types";

import { TaskController } from "../controllers/TaskController";

import { authenticate } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/role.middleware";
import { validate } from "../middlewares/validate.middleware";

import { UserRole } from "../constants/roles";

import {
  createTaskSchema,
  updateTaskSchema,
} from "../validators/task.validator";

const router = Router();

const taskController = container.get<TaskController>(
  TYPES.TaskController
);

router.use(authenticate);

router.post(
  "/",
  authorize(UserRole.MANAGER),
  validate(createTaskSchema),
  taskController.createTask
);

router.get("/", 
  authorize(UserRole.MANAGER),
  taskController.getTasks
);

router.get("/:id", taskController.getTask);

router.patch(
  "/:id",
  authorize(UserRole.MANAGER),
  validate(updateTaskSchema),
  taskController.updateTask
);

router.delete(
  "/:id",
  authorize(UserRole.MANAGER),
  taskController.deleteTask
);

export default router;