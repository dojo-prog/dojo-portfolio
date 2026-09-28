import type { ApiResponse, PaginatedData } from "@/types/api.types";
import type { EducationEntity } from "@dojo-portfolio/shared";

// =======================================
// RESPONSE SHAPE
// =======================================

export type FetchEducationsRes = ApiResponse<FetchEducationsData>;

export type FetchAllEducationsRes = ApiResponse<FetchAllEducationsData>;

export type FetchEducationRes = ApiResponse<BaseEducationData>;

// =======================================
// RESPONSE DATA SHAPE
// =======================================

export type FetchEducationsData = PaginatedData<"educations", EducationEntity>;

export type FetchAllEducationsData = { educations: EducationEntity[] };

export type BaseEducationData = { education: EducationEntity };
