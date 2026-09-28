import { PoolClient } from "pg";
import { mockProjects } from "./data";
import { truncateTable } from "../utils/truncateTable";
import { buildInsertQueryParts } from "../../src/utils/query-builder/buildInsertQueryParts";

export const seedProjects = async (client: PoolClient) => {
  console.log("\nStarting projects seed...");

  await truncateTable("projects");

  for (const p of mockProjects) {
    const { columnsStr, placeholdersStr, values } = buildInsertQueryParts(p);
    await client.query(
      `
          INSERT INTO projects (${columnsStr})
          VALUES (${placeholdersStr})
          `,
      values,
    );

    console.log(`Inserted project: ${p.title}  `);
  }

  console.log(`\nInserted ${mockProjects.length} projects successfully\n`);
};
