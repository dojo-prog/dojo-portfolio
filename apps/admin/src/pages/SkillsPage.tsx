import { Badge } from "@/components/ui/badge";
import type { SkillEntity } from "@dojo-portfolio/shared";
import Header from "./skills/Header";
import Empty from "@/components/common/Empty";

export const dummySkills: SkillEntity[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    name: "TypeScript",
    category: "Language",
    created_at: "2026-01-10T10:00:00.000Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440002",
    name: "JavaScript",
    category: "Language",
    created_at: "2026-01-11T10:00:00.000Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440003",
    name: "React",
    category: "Frontend",
    created_at: "2026-01-12T10:00:00.000Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440004",
    name: "Node.js",
    category: "Backend",
    created_at: "2026-01-13T10:00:00.000Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440005",
    name: "Express",
    category: "Backend",
    created_at: "2026-01-14T10:00:00.000Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440006",
    name: "PostgreSQL",
    category: "Database",
    created_at: "2026-01-15T10:00:00.000Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440007",
    name: "Git",
    category: "Tools",
    created_at: "2026-01-16T10:00:00.000Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440008",
    name: "Docker",
    category: "DevOps",
    created_at: "2026-01-17T10:00:00.000Z",
  },
];

const SkillsPage = () => {
  return (
    <main className="space-y-6">
      {/* Header */}
      <Header />

      {/* Skills */}
      {dummySkills.length === 0 ? (
        <Empty
          title="No skills found"
          description="No skills match your current filters, or you haven't added any skills yet. Try adjusting your filters or start by creating your first skill."
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {dummySkills.map((skill) => (
            <div
              key={skill.id}
              className="rounded-lg border bg-card p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-medium">{skill.name}</h3>

                  <Badge variant="secondary" className="mt-2 capitalize">
                    {skill.category}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default SkillsPage;
