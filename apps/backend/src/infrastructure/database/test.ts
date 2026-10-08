import { ENV } from "../../config/env";
import { pool } from "./db";

export const testDBConnection = async () => {
  try {
    await pool.query(`SELECT 1`);

    console.log(
      `Connected to PostgreSQL ${ENV.NODE_ENV === "production" ? "PROD" : "DEV"} database`,
    );
  } catch (error) {
    throw new Error("Failed to connect to the database", { cause: error });
  }
};
