import { useQuery } from "@tanstack/react-query";
import { fetchDashboardOverview } from "../api/dashboard.api";

export const useDashboardOverview = () => {
  return useQuery({
    queryKey: ["dashboard-overview"],
    queryFn: async () => {
      const res = await fetchDashboardOverview();
      return res.data?.dashboardOverview;
    },
  });
};
