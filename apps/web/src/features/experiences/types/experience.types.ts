import type { ApiResponse, PaginatedData } from "@/types/api.types";
import type { ExperienceEntity } from "@dojo-portfolio/shared";

// =======================================
// RESPONSE SHAPE
// =======================================

export type FetchExperiencesRes = ApiResponse<FetchExperiencesData>;

export type FetchAllExperiencesRes = ApiResponse<FetchAllExperiencesData>;

export type FetchExperienceRes = ApiResponse<BaseExperienceData>;

// =======================================
// RESPONSE DATA SHAPE
// =======================================

export type FetchExperiencesData = PaginatedData<
  "experiences",
  ExperienceEntity
>;

export type FetchAllExperiencesData = { experiences: ExperienceEntity[] };

export type BaseExperienceData = { experience: ExperienceEntity };
