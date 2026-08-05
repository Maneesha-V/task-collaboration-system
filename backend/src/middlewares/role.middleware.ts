import { Request, Response, NextFunction } from "express";
import { UserRole } from "../constants/roles";
import { ApiError } from "../utils/ApiError";

export const authorize = (...roles: UserRole[]) => {
  return (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
        console.log("Allowed roles:", roles);
    console.log("Current role:", req.user?.role);
    if (!req.user) {
      return next(new ApiError(401, "Unauthorized"));
    }

    if (!roles.includes(req.user.role)) {
      return next(new ApiError(403, "Forbidden"));
    }

    next();
  };
};