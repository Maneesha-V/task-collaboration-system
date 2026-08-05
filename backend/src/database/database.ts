import mongoose from "mongoose";
import { env } from "../config/env";
import logger from "../config/logger";

export const connectDB = async () => {
  try {
    await mongoose.connect(env.MONGO_URI);

    logger.info("✅ MongoDB Connected");
  } catch (error) {
    logger.info("❌ Database Connection Failed");
    console.error(error);
    process.exit(1);
  }
};