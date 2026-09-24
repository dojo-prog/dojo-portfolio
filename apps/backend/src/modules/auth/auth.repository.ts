import { UserPrivate, UserPublic } from "@dojo-portfolio/shared";
import { pool } from "../../infrastructure/database/db";
import {
  USER_PRIVATE_PROJECTION,
  USER_PUBLIC_PROJECTION,
} from "../../infrastructure/database/queries/user";
import { RegisterData } from "./auth.types";
import { buildInsertQueryParts } from "../../utils/query-builder/buildInsertQueryParts";

export const findPublicById = async (userId: string): Promise<UserPublic> => {
  const { rows } = await pool.query(
    `
    SELECT ${USER_PUBLIC_PROJECTION}
    FROM users  
    WHERE id = $1
    `,
    [userId],
  );

  return rows[0];
};

export const findPrivateById = async (userId: string): Promise<UserPrivate> => {
  const { rows } = await pool.query(
    `
    SELECT ${USER_PRIVATE_PROJECTION}
    FROM users  
    WHERE id = $1
    `,
    [userId],
  );

  return rows[0];
};

export const findPrivateByEmail = async (
  email: string,
): Promise<UserPrivate> => {
  const { rows } = await pool.query(
    `
    SELECT ${USER_PRIVATE_PROJECTION}
    FROM users  
    WHERE email = $1
    `,
    [email],
  );

  return rows[0];
};

export const register = async (data: RegisterData): Promise<UserPublic> => {
  const { columnsStr, placeholdersStr, values } = buildInsertQueryParts(data);

  const { rows } = await pool.query(
    `
    INSERT INTO users (${columnsStr})
    VALUES (${placeholdersStr})
    RETURNING ${USER_PUBLIC_PROJECTION};
    `,
    values,
  );

  return rows[0];
};
