import AnimatedContent from "@/components/AnimatedContent";
import RenderLoadingTypeText from "@/components/common/RenderLoadingTypeText";
import ProjectCard from "@/features/projects/components/ProjectCard";
import ProjectCardSkeleton from "@/features/projects/components/ProjectCardSkeleton";
import { useAllProjects } from "@/features/projects/hooks/useAllProjects";
import { useEffect, useState } from "react";

const ProjectsSection = () => {
  const { data: projects, isPending } = useAllProjects();

  const [showSlowMessage, setShowSlowMessage] = useState(false);

  // Set setShowSlowMessage to true aft 5 seconds
  useEffect(() => {
    if (!isPending) {
      setShowSlowMessage(false);
      return;
    }

    const timeout = setTimeout(() => {
      setShowSlowMessage(true);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [isPending]);

  return (
    <section
      id="projects"
      className="mx-auto min-h-screen w-full max-w-7xl px-6 py-24"
    >
      {/* Section Header */}
      <div className="mb-14 max-w-2xl">
        <p className="mb-3 text-sm font-medium uppercase tracking-wider text-muted-foreground">
          Projects
        </p>

        <h2 className="text-5xl font-bold tracking-tight">What I've built.</h2>

        <p className="mt-4 leading-7 text-muted-foreground">
          A selection of projects where I've applied what I've learned to build
          practical software.
        </p>
      </div>

      <AnimatedContent
        distance={20}
        direction="vertical"
        duration={0.45}
        ease="power2.out"
        initialOpacity={0}
        animateOpacity
        scale={1}
        threshold={0.1}
        delay={0.2}
      >
        <div className="relative grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 4xl:grid-cols-4">
          {isPending ? (
            <>
              {Array.from({ length: 3 }).map((_, index) => (
                <ProjectCardSkeleton key={index} />
              ))}

              {showSlowMessage && <RenderLoadingTypeText />}
            </>
          ) : (
            projects?.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))
          )}
        </div>
      </AnimatedContent>
    </section>
  );
};

export default ProjectsSection;
