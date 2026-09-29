import type { ProjectWithRelations } from "@dojo-portfolio/shared";
import { ExternalLink, FolderGit2 } from "lucide-react";

type Props = {
  project: ProjectWithRelations;
};

const ProjectCardPreview = ({ project }: Props) => {
  return (
    <article className="cursor-pointer overflow-hidden rounded-lg border bg-card transition-transform hover:scale-102">
      {/* Thumbnail */}
      <div className="aspect-video overflow-hidden bg-muted">
        {project.thumbnail_url ? (
          <img
            src={project.thumbnail_url}
            alt={project.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            No image
          </div>
        )}
      </div>

      {/* Content */}
      <div className="space-y-4 p-5">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-lg font-semibold">{project.title}</h3>

            {project.featured && (
              <span className="shrink-0 rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                Featured
              </span>
            )}
          </div>

          <p className="text-sm text-muted-foreground">
            {project.short_description}
          </p>
        </div>

        {/* Status */}
        <div>
          <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium capitalize">
            {project.status}
          </span>
        </div>

        {/* Skills */}
        {project.project_skills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.project_skills.map((skill) => (
              <span
                key={skill.id}
                className="rounded-md border px-2 py-1 text-xs"
              >
                {skill.name}
              </span>
            ))}
          </div>
        )}

        {/* Links */}
        <div className="flex items-center gap-3 border-t pt-4">
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(event) => event.stopPropagation()}
              className="inline-flex items-center gap-2 text-sm font-medium hover:underline"
            >
              <FolderGit2 className="h-4 w-4" />
              GitHub
            </a>
          )}

          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(event) => event.stopPropagation()}
              className="inline-flex items-center gap-2 text-sm font-medium hover:underline"
            >
              <ExternalLink className="h-4 w-4" />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProjectCardPreview;
