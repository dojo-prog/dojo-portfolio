import { useState } from "react";
import Header from "./education/Header";
import { useEducations } from "@/features/education/hooks/useEducations";
import Empty from "@/components/common/Empty";
import EducationList from "./education/EducationList";
import EducationFilters from "./education/EducationFilters";
import type { EducationQuery } from "@dojo-portfolio/shared";

const EducationPage = () => {
  const [filters, setFilters] = useState<EducationQuery>({
    page: 1,
    limit: 10,
    search: "",
    sort: undefined,
  });

  const {
    data: educationData,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useEducations({ ...filters });

  const educations = educationData?.pages.flatMap((p) => p!.educations) ?? [];

  return (
    <main className="space-y-8">
      {/* Header */}
      <Header />

      {/* Filters */}
      <EducationFilters filters={filters} setFilters={setFilters} />

      {/* Empty State */}
      {educations.length === 0 ? (
        <Empty
          title="No education records found"
          description="No records match your current filters, or you haven't added any record yet."
        />
      ) : (
        /* Education Cards */
        <EducationList
          educations={educations}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      )}
    </main>
  );
};

export default EducationPage;
