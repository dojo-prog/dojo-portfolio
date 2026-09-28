import type { ApiResponse, PaginatedData } from "@/types/api.types";
import type { ProjectWithRelations } from "@dojo-portfolio/shared";

// =======================================
// RESPONSE SHAPE
// =======================================

export type FetchProjectsRes = ApiResponse<FetchProjectsData>;

export type FetchAllProjectsRes = ApiResponse<{
  projects: ProjectWithRelations[];
}>;

export type FetchProjectRes = ApiResponse<BaseProjectData>;

// =======================================
// RESPONSE DATA SHAPE
// =======================================

export type FetchProjectsData = PaginatedData<"projects", ProjectWithRelations>;

export type BaseProjectData = { project: ProjectWithRelations };
