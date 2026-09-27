import { PoolClient } from "pg";
import { truncateTable } from "../utils/truncateTable";
import { mockContactMessages } from "./data";
import { buildInsertQueryParts } from "../../src/utils/query-builder/buildInsertQueryParts";

export const seedContactMessages = async (client: PoolClient) => {
  console.log("\nStarting contact message seed...");

  await truncateTable("contact_messages");

  for (const cm of mockContactMessages) {
    const { columnsStr, placeholdersStr, values } = buildInsertQueryParts(cm);

    await client.query(
      `
        INSERT INTO contact_messages (${columnsStr})
        VALUES (${placeholdersStr})
        `,
      values,
    );

    console.log(`Inserted contact message from: ${cm.name}  `);
  }

  console.log(
    `\nInserted ${mockContactMessages.length} contact messages successfully\n`,
  );
};
