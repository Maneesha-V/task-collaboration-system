import { z } from "zod";
import { UserRole } from "../constants/roles";

export const registerSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(3),

    email: z
      .string()
      .email()
      .trim()
      .toLowerCase(),

    password: z
      .string()
      .min(6),

    role: z.enum([
      UserRole.ADMIN,
      UserRole.MANAGER,
      UserRole.USER,
    ]),
  }),
});

export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  body: z.object({
    email: z
      .string()
      .email("Invalid email"),

    password: z
      .string()
      .min(6,"Password must be at least 6 characters"),
  }),
});


export type LoginInput = z.infer<typeof loginSchema>;
