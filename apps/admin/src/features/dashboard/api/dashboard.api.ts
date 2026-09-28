import { api } from "@/lib/axios/axios";
import type { FetchDashboardOverviewRes } from "../types/dashboard.types";

export const fetchDashboardOverview = async () => {
  const { data } = await api.get<FetchDashboardOverviewRes>(
    "/v1/dashboard/overview",
  );

  return data;
};
