import type { ApiResponse } from "@/types/api.types";
import type { DashboardOverview } from "@dojo-portfolio/shared";

// =======================================
// RESPONSE SHAPE
// =======================================

export type FetchDashboardOverviewRes = ApiResponse<{
  dashboardOverview: DashboardOverview;
}>;
