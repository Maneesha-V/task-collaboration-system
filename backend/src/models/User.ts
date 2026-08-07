import mongoose, { Schema, Document, Types } from "mongoose";
import { UserRole } from "../constants/roles";

export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  refreshToken?: string | null;
}

export interface UserListResponse {
  users: IUser[];
  total: number;
  page: number;
  totalPages: number;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER,
    },

    refreshToken: {
      type: String,
      default: null
    },
  },
  {
    timestamps: true,
  }
);


export default mongoose.model<IUser>("User", userSchema);