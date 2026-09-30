import { Server } from "http";
import { pool } from "../database/db";

export const shutdown = async (signal: string, httpServer: Server) => {
  console.log(`\n${signal} received. Starting graceful shutdown...`);

  httpServer.close(async () => {
    console.log("HTTP server closed.");

    try {
      await pool.end();

      console.log("Database pool closed.");

      process.exit(0);
    } catch (error) {
      console.error("Error during graceful shutdown:", error);
      process.exit(0);
    }
  });
};
