import { z } from "zod";
import { TaskPriority } from "../constants/task.priority";
import { TaskStatus } from "../constants/task.status";

export const createTaskSchema = z.object({
  body: z.object({
    title: z.string().min(3),

    description: z.string().min(10),

    dueDate: z.string().datetime(),

    priority: z.nativeEnum(TaskPriority),

    assignedTo: z.string(),

    project: z.string(),
  }),
});

export const updateTaskSchema = z.object({
  body: z.object({
    title: z.string().min(3).optional(),

    description: z.string().min(10).optional(),

    dueDate: z.string().datetime().optional(),

    priority: z.nativeEnum(TaskPriority).optional(),

    status: z.nativeEnum(TaskStatus).optional(),

    assignedTo: z.string().optional(),
  }),
});

export type CreateTaskInput =
  z.infer<typeof createTaskSchema>;

export type UpdateTaskInput =
  z.infer<typeof updateTaskSchema>;