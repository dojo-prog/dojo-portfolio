import {
  ContactMessage,
  ContactMessageQuery,
  CreateContactMessageBody,
} from "@dojo-portfolio/shared";
import { pool } from "../../infrastructure/database/db";
import { buildInsertQueryParts } from "../../utils/query-builder/buildInsertQueryParts";
import { objectKeysToSnakeCase } from "../../utils/camelCastToSnakeCase";
import { buildSpecificContactMessageFilter } from "../../utils/query-builder/buildSpecificContactMessageFilters";

// =======================================
// Queries
// =======================================

export const find = async (
  query: ContactMessageQuery,
): Promise<{ messages: ContactMessage[]; total: number }> => {
  const { whereClause, orderByClause, limitClause, offsetClause, values } =
    buildSpecificContactMessageFilter({
      query,
      searchableColumns: ["name", "email"],
    });

  const { rows } = await pool.query(
    `
    SELECT *,
      COUNT(*) OVER()::INT AS total
    FROM contact_messages
    ${whereClause}
    ${orderByClause}
    ${limitClause}
    ${offsetClause}
    `,
    values,
  );

  const messages = rows.map(({ total, ...message }) => message);

  return {
    messages,
    total: rows[0]?.total ?? 0,
  };
};

export const findById = async (
  contactMessageId: string,
): Promise<ContactMessage> => {
  const { rows } = await pool.query(
    `
    SELECT * FROM contact_messages
    WHERE id = $1
    `,
    [contactMessageId],
  );

  return rows[0];
};

// =======================================
// Mutations
// =======================================

export const add = async (
  payload: CreateContactMessageBody,
): Promise<ContactMessage> => {
  const { columnsStr, placeholdersStr, values } = buildInsertQueryParts(
    objectKeysToSnakeCase(payload),
  );

  const { rows } = await pool.query(
    `
    INSERT INTO contact_messages (${columnsStr})
    VALUES (${placeholdersStr})
    RETURNING *
    `,
    values,
  );

  return rows[0];
};

export const remove = async (
  contactMessageId: string,
): Promise<ContactMessage> => {
  const { rows } = await pool.query(
    `
    DELETE FROM contact_messages
    WHERE id = $1
    `,
    [contactMessageId],
  );

  return rows[0];
};

export const readMessage = async (
  contactMessageId: string,
): Promise<ContactMessage> => {
  const { rows } = await pool.query(
    `
    UPDATE contact_messages
    SET read_at = now()
    WHERE id = $1
    RETURNING *
    `,
    [contactMessageId],
  );

  return rows[0];
};

// =======================================
// Counts
// =======================================

export const findUnreadCount = async (): Promise<number> => {
  const { rows } = await pool.query(
    `
    SELECT COUNT(*) AS unread_count 
    FROM contact_messages
    WHERE read_at IS NULL
    `,
  );

  return rows[0]?.unread_count ?? 0;
};
