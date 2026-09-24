import { UserPublic } from "@dojo-portfolio/shared";

export type AccessTokenPayload = {
  id: string;
};

export type RefreshTokenPayload = {
  id: string;
};

// =======================================
// SERVICE PARAMS
// =======================================

export interface LoginParams {
  email: string;
  password: string;
}

export interface RegisterParams {
  email: string;
  password: string;
  confirm_password: string;
}

export interface RefreshAccessTokenParams {
  refresh_token: string;
}

// =======================================
// REPOSITORY DATA
// =======================================

export interface RegisterData {
  email: string;
  password_hash: string;
}

// =======================================
// RESULT
// =======================================

export interface LoginResult {
  user: UserPublic;
  access_token: string;
  refresh_token: string;
}
