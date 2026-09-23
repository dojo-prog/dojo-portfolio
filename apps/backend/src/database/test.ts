import { ENV } from "../config/env";
import { pool } from "./db";

export const testDBConnection = async () => {
  try {
    await pool.query(`SELECT 1`);

    console.log(`Connected to PostgreSQL database: ${ENV.DATABASE_NAME}`);
  } catch (error) {
    throw new Error("Failed to connect to the database", { cause: error });
  }
};
