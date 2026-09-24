import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  LoginParams,
  LoginResult,
  RefreshAccessTokenParams,
  RefreshTokenPayload,
  RegisterParams,
} from "./auth.types";
import { AppError } from "../../utils/errors/AppError";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/auth/generateAuthTokens";

import * as authRepository from "./auth.repository";
import { ENV } from "../../config/env";
import { UserPublic } from "@dojo-portfolio/shared";

export const login = async (params: LoginParams): Promise<LoginResult> => {
  const { email, password } = params;

  const userPrivate = await authRepository.findPrivateByEmail(email);

  if (!userPrivate) {
    throw new AppError(400, "Invalid email or password");
  }

  const isPasswordCorrect = await bcrypt.compare(
    password,
    userPrivate.password_hash,
  );
  if (!isPasswordCorrect) {
    throw new AppError(400, "Invalid email or password");
  }

  const { password_hash, ...userPublic } = userPrivate;

  return {
    user: userPublic,
    access_token: generateAccessToken({ id: userPublic.id }),
    refresh_token: generateRefreshToken({ id: userPublic.id }),
  };
};

export const register = async (params: RegisterParams): Promise<UserPublic> => {
  const { email, password, confirm_password } = params;

  if (password !== confirm_password) {
    throw new AppError(400, "Passwords does not match");
  }

  const existing = await authRepository.findPrivateByEmail(email);

  if (existing) {
    throw new AppError(409, "A user with this email already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const password_hash = await bcrypt.hash(password, salt);

  const userPublic = await authRepository.register({ email, password_hash });

  return userPublic;
};

export const refreshAccessToken = async (params: RefreshAccessTokenParams) => {
  const { refresh_token } = params;

  if (!refresh_token) {
    throw new AppError(401, "Unauthorized - Session expired");
  }

  let decoded: RefreshTokenPayload;

  try {
    decoded = jwt.verify(
      refresh_token,
      ENV.REFRESH_TOKEN_SECRET,
    ) as RefreshTokenPayload;
  } catch (error) {
    throw new AppError(401, "Unauthorized - Session expired");
  }

  const user = await authRepository.findPublicById(decoded.id);

  if (!user) {
    throw new AppError(401, "Unauthorized - Account has been disabled/removed");
  }

  return generateAccessToken({ id: user.id });
};
