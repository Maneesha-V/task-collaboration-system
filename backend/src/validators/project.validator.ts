import { z } from "zod";
import { ProjectStatus } from "../constants/project.status";

export const createProjectSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(3, "Title must be at least 3 characters"),

    description: z
      .string()
      .min(10, "Description must be at least 10 characters"),

    manager: z.string(),
  }),
});

export type CreateProjectInput =
  z.infer<typeof createProjectSchema>;


export const updateProjectSchema = z.object({
  body: z.object({
    title: z.string().min(3).optional(),
    description: z.string().min(10).optional(),
    status: z.nativeEnum(ProjectStatus).optional(),
    manager: z.string().optional(),
  }),
});