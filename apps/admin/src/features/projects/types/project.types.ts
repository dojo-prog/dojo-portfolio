import type { ApiResponse, PaginatedData } from "@/types/api.types";
import type { ProjectWithRelations } from "@dojo-portfolio/shared";

// =======================================
// RESPONSE SHAPE
// =======================================

export type FetchProjectsRes = ApiResponse<FetchProjectsData>;

export type FetchProjectRes = ApiResponse<BaseProjectData>;

export type CreateProjectRes = ApiResponse<BaseProjectData>;

export type UpdateProjectRes = ApiResponse<BaseProjectData>;

export type DeleteProjectRes = ApiResponse<BaseProjectData>;

// =======================================
// RESPONSE DATA SHAPE
// =======================================

export type BaseProjectData = { project: ProjectWithRelations };

export type FetchProjectsData = PaginatedData<"projects", ProjectWithRelations>;
