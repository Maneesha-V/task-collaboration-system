import { z } from "zod";
import { UserRole } from "../constants/roles";

export const createUserSchema = z.object({
  body: z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.nativeEnum(UserRole),
  }),
});

export const updateUserSchema = z.object({
  body: z.object({
    name: z.string().min(3).optional(),
    email: z.string().email().optional(),
    role: z.nativeEnum(UserRole).optional(),
  }),
});