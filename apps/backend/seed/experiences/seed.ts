import { PoolClient } from "pg";
import { truncateTable } from "../utils/truncateTable";
import { mockExperiences } from "./data";
import { buildInsertQueryParts } from "../../src/utils/query-builder/buildInsertQueryParts";

export const seedExperiences = async (client: PoolClient) => {
  console.log("\nStarting experience seed...");

  await truncateTable("experience");

  for (const e of mockExperiences) {
    const { columnsStr, placeholdersStr, values } = buildInsertQueryParts(e);

    await client.query(
      `
        INSERT INTO experience (${columnsStr})
        VALUES (${placeholdersStr})
        `,
      values,
    );

    console.log(`Inserted experience from: ${e.company}  `);
  }

  console.log(
    `\nInserted ${mockExperiences.length} experiences successfully\n`,
  );
};
