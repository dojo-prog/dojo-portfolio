import jwt from "jsonwebtoken";
import {
  AccessTokenPayload,
  RefreshTokenPayload,
} from "../../modules/auth/auth.types";
import { ENV } from "../../config/env";
import { AUTH_TOKENS } from "../../constants/auth";

export const generateAccessToken = (payload: AccessTokenPayload): string => {
  const { ACCESS_TOKEN } = AUTH_TOKENS;

  return jwt.sign(payload, ENV.ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN.expiresIn,
  });
};

export const generateRefreshToken = (payload: RefreshTokenPayload): string => {
  const { REFRESH_TOKEN } = AUTH_TOKENS;

  return jwt.sign(payload, ENV.REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN.expiresIn,
  });
};
