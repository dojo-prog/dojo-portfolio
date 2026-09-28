import { useDashboardOverview } from "@/features/dashboard/hooks/useDashboardOverview";
import Header from "./dashboard/Header";
import OverviewStats from "./dashboard/OverviewStats";
import RecentMessages from "./dashboard/RecentMessages";

export default function DashboardPage() {
  const { data: dashboardOverview, isPending } = useDashboardOverview();

  return (
    <main className="space-y-8 p-6">
      {/* Header */}
      <Header />

      {/* Stats */}
      <OverviewStats
        dashboardOverview={dashboardOverview}
        isLoading={isPending}
      />

      {/* Recent Mesages */}
      <RecentMessages dashboardOverview={dashboardOverview} />
    </main>
  );
}
