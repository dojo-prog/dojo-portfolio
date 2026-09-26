import type { ApiResponse, PaginatedData } from "@/types/api.types";
import type { EducationEntity } from "@dojo-portfolio/shared";

// =======================================
// RESPONSE SHAPE
// =======================================

export type FetchEducationsRes = ApiResponse<FetchEducationsData>;

export type FetchEducationRes = ApiResponse<BaseEducationData>;

export type CreateEducationRes = ApiResponse<BaseEducationData>;

export type UpdateEducationRes = ApiResponse<BaseEducationData>;

export type DeleteEducationRes = ApiResponse<BaseEducationData>;

// =======================================
// RESPONSE DATA SHAPE
// =======================================

export type BaseEducationData = { education: EducationEntity };

export type FetchEducationsData = PaginatedData<"educations", EducationEntity>;
