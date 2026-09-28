import {
  CreateSkillBody,
  SkillEntity,
  SkillQuery,
} from "@dojo-portfolio/shared";

import { buildFilterQueryParts } from "../../utils/query-builder/buildFilterQueryParts";
import { pool } from "../../infrastructure/database/db";
import { buildInsertQueryParts } from "../../utils/query-builder/buildInsertQueryParts";
import { objectKeysToSnakeCase } from "../../utils/camelCastToSnakeCase";

// =======================================
// Queries
// =======================================

export const find = async (query: SkillQuery): Promise<SkillEntity[]> => {
  const { whereClause, orderByClause, limitClause, offsetClause, values } =
    buildFilterQueryParts({
      query,
      searchableColumns: ["name"],
    });

  const { rows } = await pool.query(
    `
    SELECT * FROM skills 
    ${whereClause}
    ${orderByClause}
    ${limitClause}
    ${offsetClause}
    `,
    values,
  );

  return rows;
};

export const findById = async (skillId: string): Promise<SkillEntity> => {
  const { rows } = await pool.query(
    `
    SELECT * FROM skills
    WHERE id = $1
    `,
    [skillId],
  );

  return rows[0];
};

// =======================================
// Mutations
// =======================================

export const add = async (payload: CreateSkillBody): Promise<SkillEntity> => {
  const { columnsStr, placeholdersStr, values } = buildInsertQueryParts(
    objectKeysToSnakeCase(payload),
  );

  const { rows } = await pool.query(
    `
    INSERT INTO skills (${columnsStr})
    VALUES (${placeholdersStr})
    RETURNING id
    `,
    values,
  );

  const skillId = rows[0].id;

  return findById(skillId);
};

export const remove = async (skillId: string): Promise<SkillEntity> => {
  const { rows } = await pool.query(
    `
    DELETE FROM skills
    WHERE id = $1
    RETURNING *
    `,
    [skillId],
  );

  return rows[0];
};

// =======================================
// Counts
// =======================================

export const count = async (): Promise<number> => {
  const { rows } = await pool.query(
    `
    SELECT COUNT(*) FROM skills
    `,
  );

  return rows[0].count;
};
