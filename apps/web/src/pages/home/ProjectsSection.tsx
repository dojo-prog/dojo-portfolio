import ProjectCard from "@/features/projects/components/ProjectCard";
import { useAllProjects } from "@/features/projects/hooks/useAllProjects";

const ProjectsSection = () => {
  const { data: projects } = useAllProjects();

  return (
    <section
      id="projects"
      className="mx-auto min-h-screen w-full max-w-7xl px-6 py-24"
    >
      <h2 className="mb-8 text-5xl font-bold">Projects</h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {projects?.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
