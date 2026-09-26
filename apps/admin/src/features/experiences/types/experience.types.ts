import type { ApiResponse, PaginatedData } from "@/types/api.types";
import type { ExperienceEntity } from "@dojo-portfolio/shared";

// =======================================
// RESPONSE SHAPE
// =======================================

export type FetchExperiencesRes = ApiResponse<FetchExperiencesData>;

export type FetchExperienceRes = ApiResponse<BaseExperienceData>;

export type CreateExperienceRes = ApiResponse<BaseExperienceData>;

export type UpdateExperienceRes = ApiResponse<BaseExperienceData>;

export type DeleteExperienceRes = ApiResponse<BaseExperienceData>;

// =======================================
// RESPONSE DATA SHAPE
// =======================================

export type BaseExperienceData = { experience: ExperienceEntity };

export type FetchExperiencesData = PaginatedData<
  "experiences",
  ExperienceEntity
>;
