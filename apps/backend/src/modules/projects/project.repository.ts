import {
  CreateProjectBody,
  Project,
  ProjectQuery,
  ProjectWithRelations,
  UpdateProjectBody,
} from "@dojo-portfolio/shared";
import { buildFilterQueryParts } from "../../utils/query-builder/buildFilterQueryParts";
import { pool } from "../../infrastructure/database/db";
import { PROJECT_WITH_RELATIONS_PROJECTION } from "../../infrastructure/database/queries/project";
import { buildInsertQueryParts } from "../../utils/query-builder/buildInsertQueryParts";
import { buildUpdateQueryParts } from "../../utils/query-builder/buildUpdateQueryParts";
import { objectKeysToSnakeCase } from "../../utils/camelCastToSnakeCase";
import generateChanges from "../../utils/generateChanges";

// =======================================
// Queries
// =======================================

export const find = async (
  query: ProjectQuery,
): Promise<{ projects: ProjectWithRelations[]; total: number }> => {
  const { whereClause, orderByClause, limitClause, offsetClause, values } =
    buildFilterQueryParts({ query, searchableColumns: ["title"] });

  const { rows } = await pool.query(
    `
    SELECT ${PROJECT_WITH_RELATIONS_PROJECTION},
      COUNT(*) OVER()::INT AS total
    FROM projects p
    ${whereClause}
    ${orderByClause}
    ${limitClause}
    ${offsetClause}
    `,
    values,
  );

  const projects = rows.map(({ total, ...project }) => project);

  return {
    projects,
    total: rows[0]?.total ?? 0,
  };
};

export const findWithRelationsById = async (
  projectId: string,
): Promise<ProjectWithRelations> => {
  const { rows } = await pool.query(
    `
    SELECT ${PROJECT_WITH_RELATIONS_PROJECTION}
    FROM projects p
    WHERE id = $1
    `,
    [projectId],
  );

  return rows[0];
};

export const findById = async (projectId: string): Promise<Project> => {
  const { rows } = await pool.query(
    `
    SELECT *
    FROM projects 
    WHERE id = $1
    `,
    [projectId],
  );

  return rows[0];
};

// =======================================
// Mutations
// =======================================

export const add = async (
  payload: CreateProjectBody,
): Promise<ProjectWithRelations> => {
  const data = objectKeysToSnakeCase(payload);

  const { columnsStr, placeholdersStr, values } = buildInsertQueryParts(data);

  const { rows } = await pool.query(
    `
    INSERT INTO projects (${columnsStr})
    VALUES (${placeholdersStr})
    RETURNING id; 
    `,
    values,
  );

  const projectId = rows[0].id;

  return findWithRelationsById(projectId);
};

export const update = async (
  project: Project,
  payload: UpdateProjectBody,
): Promise<ProjectWithRelations> => {
  const changes = generateChanges(project, objectKeysToSnakeCase(payload));

  const { setClause, values } = buildUpdateQueryParts(changes);
  values.push(project.id);

  await pool.query(
    `
    UPDATE projects
    ${setClause}
    WHERE id = $${values.length}
    `,
    values,
  );

  return findWithRelationsById(project.id);
};

export const remove = async (projectId: string): Promise<void> => {
  await pool.query(
    `
    DELETE FROM projects
    WHERE id = $1
    `,
    [projectId],
  );
};

export const updateSkills = async (
  projectId: string,
  skillIds: string[],
): Promise<ProjectWithRelations> => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    await client.query(
      `
      DELETE FROM project_skill 
      WHERE project_id = $1
      `,
      [projectId],
    );

    if (skillIds.length > 0) {
      await client.query(
        `
        INSERT INTO project_skills 
        SELECT $1, unnest($2::uuid[])
        `,
        [projectId, skillIds],
      );
    }

    await client.query("COMMIT");

    return findWithRelationsById(projectId);
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};
