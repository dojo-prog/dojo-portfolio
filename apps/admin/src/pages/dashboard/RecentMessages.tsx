import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ContactMessageCard from "@/features/contacts/components/ContactMessageCard";
import type { DashboardOverview } from "@dojo-portfolio/shared";

type Props = {
  dashboardOverview: DashboardOverview | undefined;
};

const RecentMessages = ({ dashboardOverview }: Props) => {
  return (
    <section className="w-full">
      <Card>
        <CardHeader>
          <CardTitle>Recent Messages</CardTitle>
        </CardHeader>

        <CardContent>
          {dashboardOverview?.recent_messages?.length ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {dashboardOverview.recent_messages.map((rm) => (
                <ContactMessageCard key={rm.id} message={rm} />
              ))}
            </div>
          ) : (
            <div className="flex h-48 items-center justify-center">
              <p className="text-sm text-muted-foreground">
                No recent messages.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
};

export default RecentMessages;
