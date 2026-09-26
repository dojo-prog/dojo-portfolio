import {
  CreateEducationBody,
  EducationEntity,
  EducationQuery,
  UpdateEducationBody,
} from "@dojo-portfolio/shared";
import { buildFilterQueryParts } from "../../utils/query-builder/buildFilterQueryParts";
import { pool } from "../../infrastructure/database/db";
import { buildInsertQueryParts } from "../../utils/query-builder/buildInsertQueryParts";
import { objectKeysToSnakeCase } from "../../utils/camelCastToSnakeCase";
import generateChanges from "../../utils/generateChanges";
import { buildUpdateQueryParts } from "../../utils/query-builder/buildUpdateQueryParts";

export const find = async (
  query: EducationQuery,
): Promise<{ educations: EducationEntity[]; total: number }> => {
  const { whereClause, orderByClause, limitClause, offsetClause, values } =
    buildFilterQueryParts({
      query,
      searchableColumns: ["institution", "degree"],
    });

  const { rows } = await pool.query(
    `
    SELECT *,
      COUNT(*) OVER()::INT AS total
    FROM education
    ${whereClause}
    ${orderByClause}
    ${limitClause}
    ${offsetClause}
    `,
    values,
  );

  const educations = rows.map(({ total, ...education }) => education);

  return {
    educations,
    total: rows[0]?.total ?? 0,
  };
};

export const findById = async (
  educationId: string,
): Promise<EducationEntity> => {
  const { rows } = await pool.query(
    `
    SELECT * FROM education
    WHERE id = $1
    `,
    [educationId],
  );

  return rows[0];
};

export const add = async (
  payload: CreateEducationBody,
): Promise<EducationEntity> => {
  const { columnsStr, placeholdersStr, values } = buildInsertQueryParts(
    objectKeysToSnakeCase(payload),
  );

  const { rows } = await pool.query(
    `
    INSERT INTO education (${columnsStr})
    VALUES (${placeholdersStr})
    RETURNING *
    `,
    values,
  );

  return rows[0];
};

export const update = async (
  education: EducationEntity,
  payload: UpdateEducationBody,
): Promise<EducationEntity> => {
  const changes = generateChanges(education, objectKeysToSnakeCase(payload));

  const { setClause, values } = buildUpdateQueryParts(changes);
  values.push(education.id);

  const { rows } = await pool.query(
    `
    UPDATE education
    ${setClause}
    WHERE id = $${values.length}
    RETURNING *
    `,
    values,
  );

  return rows[0];
};

export const remove = async (educationId: string): Promise<EducationEntity> => {
  const { rows } = await pool.query(
    `
    DELETE FROM education
    WHERE id = $1
    RETURNING *
    `,
    [educationId],
  );

  return rows[0];
};
