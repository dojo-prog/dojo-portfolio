import { useProjects } from "@/features/projects/hooks/useProjects";
import Header from "./projects/Header";
import ProjectList from "./projects/ProjectList";
import { useState } from "react";
import type { ProjectQuery } from "@dojo-portfolio/shared";

const ProjectsPage = () => {
  const [filters, setFilters] = useState<ProjectQuery>({
    page: 1,
    limit: 10,
    search: "",
    sort: undefined,
    featured: undefined,
    status: undefined,
  });

  const { data: projectData } = useProjects({ ...filters });

  console.log(projectData);

  const projects = projectData?.pages.flatMap((p) => p?.projects) ?? [];

  return (
    <div className="space-y-8">
      <Header />
      <ProjectList
        projects={projects}
        filters={filters}
        setFilters={setFilters}
      />
    </div>
  );
};

export default ProjectsPage;
