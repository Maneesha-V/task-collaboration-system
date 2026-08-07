import { Schema, model, Document, Types } from "mongoose";
import { TaskStatus } from "../constants/task.status";
import { TaskPriority } from "../constants/task.priority";


export interface ITask extends Document {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: Date;
  project: Types.ObjectId;
  assignedTo: Types.ObjectId;
  createdBy: Types.ObjectId;
}
export interface TaskListResponse {
  tasks: ITask[];
  total: number;
  page: number;
  totalPages: number;
}
export interface AssignedTaskResponse {
  _id: Types.ObjectId;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: Date;
  assignedTo: Types.ObjectId;
  project: {
    _id: Types.ObjectId;
    title: string;
  };
  createdBy: {
    _id: Types.ObjectId;
    name: string;
  };
}
const taskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: Object.values(TaskStatus),
      default: TaskStatus.TODO,
    },

    priority: {
      type: String,
      enum: Object.values(TaskPriority),
      default: TaskPriority.MEDIUM,
    },

    dueDate: {
      type: Date,
      required: true,
    },

    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// taskSchema.index({ project: 1 });
// taskSchema.index({ assignedTo: 1 });
// taskSchema.index({ status: 1 });

export const Task = model<ITask>("Task", taskSchema);