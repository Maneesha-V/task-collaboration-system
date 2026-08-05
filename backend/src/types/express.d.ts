import "express";
import { UserRole } from "../constants/roles";

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      userId: string;
      role: UserRole;
    };
  }
}

export {};