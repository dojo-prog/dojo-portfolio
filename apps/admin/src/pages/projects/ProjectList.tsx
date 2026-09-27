import ProjectCard from "@/features/projects/components/ProjectCard";
import type {
  ProjectQuery,
  ProjectWithRelations,
} from "@dojo-portfolio/shared";
import ProjectFilters from "./ProjectFilters";
import type { Dispatch, SetStateAction } from "react";
import Empty from "@/components/common/Empty";
import { useNavigate } from "react-router-dom";
import { useScroll } from "@/hooks/useScroll";

type Props = {
  projects: ProjectWithRelations[];
  filters: ProjectQuery;
  setFilters: Dispatch<SetStateAction<ProjectQuery>>;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => Promise<unknown>;
};

const ProjectList = ({
  projects,
  filters,
  setFilters,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: Props) => {
  const navigate = useNavigate();

  const { observerRef } = useScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  return (
    <main className="space-y-6">
      {/* Filters */}
      <ProjectFilters filters={filters} setFilters={setFilters} />

      {/* Projects */}
      {projects.length === 0 ? (
        <Empty
          title="No projects found"
          description="No projects match your current filters, or you haven't added any projects yet. Try adjusting your filters or start by creating your first project."
          actionLabel="Add Project"
          onAction={() => navigate("/projects/add")}
        />
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}

          {hasNextPage && <div ref={observerRef} className="h-1" />}
        </div>
      )}
    </main>
  );
};

export default ProjectList;
