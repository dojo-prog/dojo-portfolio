import { PoolClient } from "pg";
import { truncateTable } from "../utils/truncateTable";
import { mockEducations } from "./data";
import { buildInsertQueryParts } from "../../src/utils/query-builder/buildInsertQueryParts";

export const seedEducation = async (client: PoolClient) => {
  console.log("\nStarting education seed...");

  await truncateTable("education");

  for (const e of mockEducations) {
    const { columnsStr, placeholdersStr, values } = buildInsertQueryParts(e);

    await client.query(
      `
        INSERT INTO education (${columnsStr})
        VALUES (${placeholdersStr})
        `,
      values,
    );

    console.log(`Inserted education from: ${e.institution}  `);
  }

  console.log(`\nInserted ${mockEducations.length} education successfully\n`);
};
