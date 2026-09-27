import { ENV } from "../config/env";

export const AUTH_TOKENS = {
  ACCESS_TOKEN: {
    name: "access_token",
    expiresIn: "15m",
    cookieMaxAge: 15 * 60 * 1000,
  },
  REFRESH_TOKEN: {
    name: "refresh_token",
    expiresIn: "1d",
    cookieMaxAge: 24 * 60 * 1000,
  },
} as const;

export const BASE_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: ENV.NODE_ENV === "production",
  sameSite: "strict",
} as const;
