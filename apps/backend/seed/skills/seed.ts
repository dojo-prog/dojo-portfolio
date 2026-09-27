import { PoolClient } from "pg";
import { truncateTable } from "../utils/truncateTable";
import { mockSkills } from "./data";

export const seedSkills = async (client: PoolClient) => {
  console.log("\nStarting skills seed...");

  await truncateTable("skills");

  for (const u of mockSkills) {
    await client.query(
      `
        INSERT INTO skills (name, category)
        VALUES ($1, $2)
        `,
      [u.name, u.category],
    );

    console.log(`Inserted user w/ email of: ${u.name}  `);
  }

  console.log(`\nInserted ${mockSkills.length} skills successfully\n`);
};
