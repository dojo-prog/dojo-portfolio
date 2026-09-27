import { useExperiences } from "@/features/experiences/hooks/useExperiences";
import { useState } from "react";
import type { ExperienceQuery } from "@dojo-portfolio/shared";
import Header from "./experiences/Header";
import ExperienceList from "./experiences/ExperienceList";
import Empty from "@/components/common/Empty";
import ExperienceFilters from "./experiences/ExperienceFilters";

const ExperiencesPage = () => {
  const [filters, setFilters] = useState<ExperienceQuery>({
    page: 1,
    limit: 10,
    search: "",
    current: false,
  });

  const {
    data: expData,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useExperiences({ ...filters });

  console.log(hasNextPage);

  const experiences = expData?.pages.flatMap((p) => p?.experiences) ?? [];

  return (
    <main className="space-y-8">
      <Header />

      <ExperienceFilters filters={filters} setFilters={setFilters} />

      {/* Experience List */}
      {experiences.length === 0 ? (
        <Empty
          title="No experiences found"
          description="No experiences match your current filters, or you haven't added any experiences yet."
        />
      ) : (
        <ExperienceList
          experiences={experiences}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      )}
    </main>
  );
};

export default ExperiencesPage;
