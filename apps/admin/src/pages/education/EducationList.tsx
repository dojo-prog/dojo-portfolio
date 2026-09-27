import EducationCard from "@/features/education/components/EducationCard";
import { useScroll } from "@/hooks/useScroll";
import type { EducationEntity } from "@dojo-portfolio/shared";

type Props = {
  educations: EducationEntity[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => Promise<unknown>;
};

const EducationList = ({
  educations,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: Props) => {
  const { observerRef } = useScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {educations.map((education) => (
        <EducationCard key={education.id} education={education} />
      ))}

      {hasNextPage && <div ref={observerRef} className="h-1" />}
    </div>
  );
};

export default EducationList;
