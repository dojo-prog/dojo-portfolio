import { ENV } from "../config/env";
import { AUTH_TOKENS } from "../constants/auth";
import { pool } from "../infrastructure/database/db";
import { USER_PUBLIC_PROJECTION } from "../infrastructure/database/queries/user";
import { AccessTokenPayload } from "../modules/auth/auth.types";
import { Middleware } from "../types/handler.types";
import { AppError } from "../utils/errors/AppError";
import jwt from "jsonwebtoken";

export const protectRoute: Middleware = async (req, res, next) => {
  const accessToken = req.cookies[AUTH_TOKENS.ACCESS_TOKEN.name];

  if (!accessToken) {
    return next(new AppError(401, "Unauthorized"));
  }

  let decoded: AccessTokenPayload;

  try {
    decoded = jwt.verify(
      accessToken,
      ENV.ACCESS_TOKEN_SECRET,
    ) as AccessTokenPayload;
  } catch (error) {
    return next(new AppError(401, "Unauthorized"));
  }

  const { rows } = await pool.query(
    `
    SELECT ${USER_PUBLIC_PROJECTION}
    FROM users 
    WHERE id = $1
    `,
    [decoded.id],
  );

  const user = rows[0];

  if (!user) {
    return next(new AppError(401, "Unauthorized"));
  }

  req.user = user;

  next();
};
