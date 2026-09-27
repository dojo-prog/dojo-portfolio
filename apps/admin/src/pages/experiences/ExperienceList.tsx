import type { ExperienceEntity } from "@dojo-portfolio/shared";
import { useScroll } from "@/hooks/useScroll";
import ExperienceCard from "@/features/experiences/components/ExperienceCard";

type Props = {
  experiences: ExperienceEntity[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => Promise<unknown>;
};

const ExperienceList = ({
  experiences,
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
      {experiences.map((exp) => (
        <ExperienceCard key={exp.id} experience={exp} />
      ))}

      {hasNextPage && <div ref={observerRef} className="h-1" />}
    </div>
  );
};

export default ExperienceList;
