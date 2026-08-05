import { Schema, model, Document, Types } from "mongoose";
import { ProjectStatus } from "../constants/project.status";

export interface IProject extends Document {
  title: string;
  description: string;
  status: ProjectStatus;
  manager: Types.ObjectId;
  members: Types.ObjectId[];
  createdBy: Types.ObjectId;
}

const projectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: Object.values(ProjectStatus),
      default: ProjectStatus.ACTIVE,
    },

    manager: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

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

// projectSchema.index({ title: 1 });
// projectSchema.index({ manager: 1 });

export const Project = model<IProject>(
  "Project",
  projectSchema
);