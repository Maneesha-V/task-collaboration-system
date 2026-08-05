import "reflect-metadata";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

import { connectDB } from "../database/database";
import User from "../models/User";
import { UserRole } from "../constants/roles";

dotenv.config();

const seedAdmin = async () => {
  try {
    await connectDB();

    const adminExists = await User.findOne({
      role: UserRole.ADMIN,
    });

    if (adminExists) {
      console.log("✅ Admin already exists");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    await User.create({
      name: "System Admin",
      email: "admin@example.com",
      password: hashedPassword,
      role: UserRole.ADMIN,
    });

    console.log("✅ Admin created successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding admin:", error);
    process.exit(1);
  }
};

seedAdmin();