import { ITask } from "../../models/Task";

export interface AssignedTaskResponseDto {
  _id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: Date;
  project: {
    _id: string;
    title: string;
  };
  createdBy: {
    _id: string;
    name: string;
  };
}

export const toAssignedTaskResponseDto = (
  task: ITask
): AssignedTaskResponseDto => ({
  _id: task._id.toString(),
  title: task.title,
  description: task.description,
  status: task.status,
  priority: task.priority,
  dueDate: task.dueDate,

  project: {
    _id: (task.project as any)._id.toString(),
    title: (task.project as any).title,
  },

  createdBy: {
    _id: (task.createdBy as any)._id.toString(),
    name: (task.createdBy as any).name,
  },
});