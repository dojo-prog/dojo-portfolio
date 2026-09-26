import type { ApiResponse } from "@/types/api.types";
import type { UserPublic } from "@dojo-portfolio/shared";

// =======================================
// RESPONSE SHAPE
// =======================================

export type GetCurrentUserResponse = ApiResponse<BaseUserData>;
export type LoginResponse = ApiResponse<BaseUserData>;
export type RegisterResponse = ApiResponse<BaseUserData>;

// =======================================
// RESPONSE DATA SHAPE
// =======================================

export type BaseUserData = { user: UserPublic };
