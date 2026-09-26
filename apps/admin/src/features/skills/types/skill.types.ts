import type { ApiResponse } from "@/types/api.types";
import type { SkillEntity } from "@dojo-portfolio/shared";

// =======================================
// RESPONSE SHAPE
// =======================================

export type FetchSkillsRes = ApiResponse<{ skills: SkillEntity[] }>;

export type FetchSkillRes = ApiResponse<BaseSkillData>;

export type CreateSkillRes = ApiResponse<BaseSkillData>;

export type DeleteSkillRes = ApiResponse<BaseSkillData>;

// =======================================
// RESPONSE DATA SHAPE
// =======================================

export type BaseSkillData = {
  skill: SkillEntity;
};
