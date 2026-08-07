import { Router } from "express";

import container from "../config/container";
import TYPES from "../types/types";

import { ProjectController } from "../controllers/ProjectController";

import { authenticate } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/role.middleware";

import { UserRole } from "../constants/roles";
import { validate } from "../middlewares/validate.middleware";
import { createProjectSchema, updateProjectSchema } from "../validators/project.validator";

const router = Router();

const projectController =
  container.get<ProjectController>(
    TYPES.ProjectController
  );

router.use(authenticate);

router.post(
  "/",
  authorize(UserRole.MANAGER),
  validate(createProjectSchema),
  projectController.createProject
);

router.get(
  "/",
  projectController.getProjects
);
router.get(
  "/all-projects",
  projectController.fetchProjects
)
router.get(
  "/:id",
  projectController.getProject
);

router.delete(
  "/:id",
  authorize(UserRole.MANAGER),
  projectController.deleteProject
);
router.patch(
  "/:id",
  authorize(
    UserRole.MANAGER
  ),
  validate(updateProjectSchema),
  projectController.updateProject
);

export default router;