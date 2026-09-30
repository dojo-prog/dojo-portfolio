import { pool } from "./db";

export const testDBConnection = async () => {
  try {
    await pool.query(`SELECT 1`);

    console.log(`Connected to PostgreSQL database`);
  } catch (error) {
    throw new Error("Failed to connect to the database", { cause: error });
  }
};
