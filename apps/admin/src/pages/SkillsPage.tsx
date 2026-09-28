import type { SkillEntity, SkillQuery } from "@dojo-portfolio/shared";
import Header from "./skills/Header";
import Empty from "@/components/common/Empty";
import { useSkills } from "@/features/skills/hooks/useSkills";
import { useState } from "react";
import SkillCard from "@/features/skills/components/SkillCard";
import { useDebounce } from "@/hooks/useDebounce";

export const dummySkills: SkillEntity[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    name: "TypeScript",
    category: "language",
    created_at: "2026-01-10T10:00:00.000Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440002",
    name: "JavaScript",
    category: "language",
    created_at: "2026-01-11T10:00:00.000Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440003",
    name: "React",
    category: "frontend",
    created_at: "2026-01-12T10:00:00.000Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440004",
    name: "Node.js",
    category: "backend",
    created_at: "2026-01-13T10:00:00.000Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440005",
    name: "Express",
    category: "backend",
    created_at: "2026-01-14T10:00:00.000Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440006",
    name: "PostgreSQL",
    category: "database",
    created_at: "2026-01-15T10:00:00.000Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440007",
    name: "Git",
    category: "tools",
    created_at: "2026-01-16T10:00:00.000Z",
  },
];

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
