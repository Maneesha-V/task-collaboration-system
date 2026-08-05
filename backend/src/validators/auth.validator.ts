import { z } from "zod";
import { UserRole } from "../constants/roles";

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters"),

  email: z
    // .string()
    .email("Invalid email address")
    .trim()
    .toLowerCase(),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),

  role: z.enum([
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.USER,
  ]),
});

export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
  }),
});

export type LoginInput = z.infer<typeof loginSchema>;