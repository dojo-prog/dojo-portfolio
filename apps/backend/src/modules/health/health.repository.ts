import { pool } from "../../infrastructure/database/db";

export const checkDatabase = async () => {
  try {
    await pool.query("SELECT 1");

    return true;
  } catch {
    return false;
  }
};
