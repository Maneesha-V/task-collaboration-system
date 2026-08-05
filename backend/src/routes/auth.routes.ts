import { Router } from "express";

import container from "../config/container";
import TYPES from "../types/types";
import { AuthController } from "../controllers/AuthController";
import { validate } from "../middlewares/validate.middleware";
import { loginSchema, registerSchema } from "../validators/auth.validator";


const router = Router();

const authController = container.get<AuthController>(
  TYPES.AuthController
);

router.post(
  "/register",
  validate(registerSchema),
  authController.register
);

router.post(
  "/login",
  validate(loginSchema),
  authController.login
);
router.post(
 "/refresh-token",
 authController.refreshToken
);
router.post(
  "/logout",
  authController.logout
);

export default router;