import { useProjects } from "@/features/projects/hooks/useProjects";
import Header from "./projects/Header";
import ProjectList from "./projects/ProjectList";
import { useState } from "react";
import type { ProjectQuery } from "@dojo-portfolio/shared";
import { useDebounce } from "@/hooks/useDebounce";

const ProjectsPage = () => {
  const [filters, setFilters] = useState<ProjectQuery>({
    page: 1,
    limit: 10,
    search: "",
    sort: undefined,
    featured: undefined,
    status: undefined,
  });

  const debouncedSearch = useDebounce(filters.search);

  const {
    data: projectData,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useProjects({ ...filters, search: debouncedSearch });

  console.log(projectData);

  const projects = projectData?.pages.flatMap((p) => p!.projects) ?? [];

  return (
    <div className="space-y-8">
      <Header />
      <ProjectList
        projects={projects}
        filters={filters}
        setFilters={setFilters}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
      />
    </div>
  );
};

export default ProjectsPage;
