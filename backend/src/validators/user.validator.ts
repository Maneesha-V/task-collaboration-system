import { z } from "zod";
import { UserRole } from "../constants/roles";

export const createUserSchema = z.object({
  body: z.object({
    name: z.string().min(3),
    email: z.email({
      message: "Invalid email address",
    }),
    password: z.string().min(6),
    role: z.nativeEnum(UserRole),
  }),
});

export type CreateUserRequest = z.infer<typeof createUserSchema>;

export type CreateUserInput = CreateUserRequest["body"];

export const updateUserSchema = z.object({
  body: z.object({
    name: z.string().min(3).optional(),
    email: z.string().email().optional(),
    role: z.nativeEnum(UserRole).optional(),
  }),
});

export type UpdateUserRequest = z.infer<typeof updateUserSchema>;

export type UpdateUserInput = UpdateUserRequest["body"];