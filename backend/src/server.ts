import "reflect-metadata";
import app from "./app";
import { connectDB } from "./database/database";
import logger from "./config/logger";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(Number(PORT), () => {
      logger.info(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
  }
};

startServer();