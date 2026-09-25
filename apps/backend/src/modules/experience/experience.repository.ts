import {
  CreateExperienceBody,
  ExperienceEntity,
  ExperienceQuery,
  UpdateExperienceBody,
} from "@dojo-portfolio/shared";
import { buildFilterQueryParts } from "../../utils/query-builder/buildFilterQueryParts";
import { pool } from "../../infrastructure/database/db";
import { buildInsertQueryParts } from "../../utils/query-builder/buildInsertQueryParts";
import { objectKeysToSnakeCase } from "../../utils/camelCastToSnakeCase";
import generateChanges from "../../utils/generateChanges";
import { buildUpdateQueryParts } from "../../utils/query-builder/buildUpdateQueryParts";

export const find = async (
  query: ExperienceQuery,
): Promise<{ experiences: ExperienceEntity[]; total: number }> => {
  const { whereClause, orderByClause, limitClause, offsetClause, values } =
    buildFilterQueryParts({
      query,
      searchableColumns: ["company", "position"],
    });

  const { rows } = await pool.query(
    `
    SELECT * FROM experience 
    ${whereClause}
    ${orderByClause}
    ${limitClause}
    ${offsetClause}
    `,
    values,
  );

  const experiences = rows.map(({ total, ...experience }) => experience);

  return {
    experiences,
    total: rows[0]?.total ?? 0,
  };
};

export const findById = async (
  experienceId: string,
): Promise<ExperienceEntity> => {
  const { rows } = await pool.query(
    `
    SELECT * FROM experience
    WHERE id = $1
    `,
    [experienceId],
  );

  return rows[0];
};

export const add = async (
  payload: CreateExperienceBody,
): Promise<ExperienceEntity> => {
  const { columnsStr, placeholdersStr, values } = buildInsertQueryParts(
    objectKeysToSnakeCase(payload),
  );

  const { rows } = await pool.query(
    `
    INSERT INTO experience (${columnsStr})
    VALUES (${placeholdersStr})
    RETURNING id
    `,
    values,
  );

  const experienceId = rows[0].id;

  return findById(experienceId);
};

export const update = async (
  experience: ExperienceEntity,
  payload: UpdateExperienceBody,
): Promise<ExperienceEntity> => {
  const changes = generateChanges(experience, objectKeysToSnakeCase(payload));

  const { setClause, values } = buildUpdateQueryParts(changes);
  values.push(experience.id);

  const { rows } = await pool.query(
    `
    UPDATE experience
    ${setClause}
    WHERE id = $${values.length}
    `,
    values,
  );

  return rows[0];
};

export const remove = async (
  experienceId: string,
): Promise<ExperienceEntity> => {
  const { rows } = await pool.query(
    `
    DELETE FROM experience
    WHERE id = $1
    RETURNING * 
    `,
    [experienceId],
  );

  return rows[0];
};
