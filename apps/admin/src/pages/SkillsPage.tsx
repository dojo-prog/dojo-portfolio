import type { SkillQuery } from "@dojo-portfolio/shared";
import Header from "./skills/Header";
import Empty from "@/components/common/Empty";
import { useSkills } from "@/features/skills/hooks/useSkills";
import { useState } from "react";
import SkillCard from "@/features/skills/components/SkillCard";
import { useDebounce } from "@/hooks/useDebounce";
import SkillFilters from "./skills/SkillFilters";

const SkillsPage = () => {
  const [filters, setFilters] = useState<SkillQuery>({
    search: "",
    category: undefined,
    sort: undefined,
  });

  const debouncedSearch = useDebounce(filters.search);

  const { data } = useSkills({ ...filters, search: debouncedSearch });

  const skills = data ?? [];

  return (
    <main className="space-y-6">
      {/* Header */}
      <Header />

      {/* Filters */}
      <SkillFilters filters={filters} setFilters={setFilters} />

      {/* Skills */}
      {skills.length === 0 ? (
        <Empty
          title="No skills found"
          description="No skills match your current filters, or you haven't added any skills yet. Try adjusting your filters or start by creating your first skill."
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {skills.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      )}
    </main>
  );
};

export default SkillsPage;
