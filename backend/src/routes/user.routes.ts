import { Router } from "express";

import container from "../config/container";
import TYPES from "../types/types";

import { UserController } from "../controllers/UserController";

import { authenticate } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/role.middleware";

import { UserRole } from "../constants/roles";
import { createUserSchema, updateUserSchema } from "../validators/user.validator";
import { validate } from "../middlewares/validate.middleware";


const router = Router();


const userController =
container.get<UserController>(
  TYPES.UserController
);

router.use(
  authenticate,
  // authorize(UserRole.ADMIN)
);

router.get(
  "/",
  authorize(
    UserRole.ADMIN,
    UserRole.MANAGER
  ),
  userController.getUsers
);

router.post(
  "/",
  authorize(UserRole.ADMIN),
  validate(createUserSchema),
  userController.createUser
);

router.delete(
  "/:id",
  authorize(UserRole.ADMIN),
  userController.deleteUser
);

router.get(
  "/edit/:id",
  authorize(UserRole.ADMIN),
  userController.getUser
);

router.patch(
  "/edit/:id",
  authorize(UserRole.ADMIN),
  validate(updateUserSchema),
  userController.updateUser
);

export default router;