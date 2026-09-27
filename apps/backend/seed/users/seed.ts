import { PoolClient } from "pg";
import { truncateTable } from "../utils/truncateTable";
import bcrypt from "bcryptjs";
import { mockUsers } from "./data";

export const seedUsers = async (client: PoolClient) => {
  console.log("\nStarting users seed...");

  await truncateTable("users");

  const salt = await bcrypt.genSalt(10);
  const password_hash = await bcrypt.hash("testPass", salt);

  for (const u of mockUsers) {
    const data = {
      email: u.email.toLowerCase(),
      password_hash,
    };

    await client.query(
      `
      INSERT INTO users (email, password_hash)
      VALUES ($1, $2)
      `,
      [data.email, data.password_hash],
    );

    console.log(`Inserted user w/ email of: ${data.email}  `);
  }

  console.log(`\nInserted ${mockUsers.length} users successfully\n`);
};
