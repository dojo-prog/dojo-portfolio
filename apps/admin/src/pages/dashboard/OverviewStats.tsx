import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DashboardOverview } from "@dojo-portfolio/shared";
import {
  BriefcaseBusiness,
  FolderKanban,
  Mail,
  Star,
  Wrench,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

type Props = {
  dashboardOverview: DashboardOverview | undefined;
  isLoading: boolean;
};

const OverviewStats = ({ dashboardOverview, isLoading }: Props) => {
  const stats = [
    {
      title: "Projects",
      value: dashboardOverview?.stats.projects ?? 0,
      description: "Total projects",
      icon: FolderKanban,
      path: "/projects",
    },
    {
      title: "Featured Projects",
      value: dashboardOverview?.stats.featured_projects ?? 0,
      description: "Currently featured",
      icon: Star,
      path: "/projects",
    },
    {
      title: "Skills",
      value: dashboardOverview?.stats.skills ?? 0,
      description: "Skills listed",
      icon: Wrench,
      path: "/skills",
    },
    {
      title: "Experience",
      value: dashboardOverview?.stats.experiences ?? 0,
      description: "Experience entries",
      icon: BriefcaseBusiness,
      path: "/experiences",
    },
    {
      title: "Unread Messages",
      value: dashboardOverview?.stats.unread_messages ?? 0,
      description: "Awaiting your response",
      icon: Mail,
      path: "/contact/messages",
    },
  ];

  const navigate = useNavigate();

  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <Card
            key={stat.title}
            className="hover:scale-105 duration-150 cursor-pointer"
            onClick={() => navigate(stat.path)}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>

              <Icon className="size-4 text-muted-foreground" />
            </CardHeader>

            <CardContent>
              <div className="text-2xl font-bold">
                {isLoading ? "—" : stat.value}
              </div>

              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </section>
  );
};

export default OverviewStats;
