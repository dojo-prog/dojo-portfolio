import { pool } from "../../src/infrastructure/database/db";

export const truncateTable = async (tablename: string) => {
  console.log(`Truncating ${tablename} table`);
  await pool.query(`TRUNCATE TABLE ${tablename} CASCADE`);
};
