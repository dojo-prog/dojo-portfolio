import type { ApiResponse } from "@/types/api.types";
import type { SkillEntity } from "@dojo-portfolio/shared";

// =======================================
// RESPONSE SHAPE
// =======================================

export type FetchSkillsRes = ApiResponse<FetchSkillsData>;

export type FetchAllSkillsRes = ApiResponse<FetchAllSkillsData>;

export type FetchSkillRes = ApiResponse<BaseSkillData>;

// =======================================
// RESPONSE DATA SHAPE
// =======================================

export type FetchSkillsData = { skills: SkillEntity[] };

export type FetchAllSkillsData = { skills: SkillEntity[] };

export type BaseSkillData = { skill: SkillEntity };
