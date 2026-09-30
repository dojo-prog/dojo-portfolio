import { Button } from "@/components/ui/button";
import { DialogTitle } from "@/components/ui/dialog";
import { formatDate } from "@/utils/formatDate";
import type { ProjectWithRelations } from "@dojo-portfolio/shared";
import { Cog, ExternalLink, FolderGit2, Pen, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteProjectDialog from "./DeleteProjectDialog";

type Props = {
  project: ProjectWithRelations;
};

const ProjectDetails = ({ project }: Props) => {
  const [deletingProject, setDeletingProject] = useState(false);

  const navigate = useNavigate();

  return (
    <>
      <div
        className="w-full h-full overflow-y-auto"
        style={{ scrollbarWidth: "none" }}
      >
        {/* Hero */}
        <div className="aspect-video w-full shrink-0 overflow-hidden bg-muted">
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

        {/* Main */}
        <div className="space-y-8 p-6">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              {/* Status / Featured */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium capitalize">
                  {project.status}
                </span>

                {project.featured && (
                  <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                    Featured
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap justify-end gap-2">
                <Button
                  className="px-6 text-white"
                  onClick={() => navigate(`/projects/${project.id}/edit`)}
                >
                  <Pen className="mr-1 size-4" />
                  Edit Project
                </Button>

                <Button
                  variant="secondary"
                  className="px-6 text-white"
                  onClick={() => navigate(`/projects/${project.id}/skills/set`)}
                >
                  <Cog className="mr-1 size-4" />
                  Set Skills
                </Button>

                <Button
                  variant="destructive"
                  className="px-6"
                  onClick={() => setDeletingProject(true)}
                >
                  <Trash2 className="mr-1 size-4" />
                  Delete Project
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <DialogTitle className="text-2xl font-bold">
                {project.title}
              </DialogTitle>

              <p className="text-base text-muted-foreground">
                {project.short_description}
              </p>
            </div>
          </div>

          {/* Description */}
          <section className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wide">
              About the Project
            </h4>

            <p className="whitespace-pre-line text-sm leading-7 text-muted-foreground">
              {project.description}
            </p>
          </section>

          {/* Problem & Solution */}
          {(project.problem || project.solution) && (
            <div className="grid gap-6 md:grid-cols-2">
              {project.problem && (
                <section className="space-y-3">
                  <h4 className="text-sm font-semibold uppercase tracking-wide">
                    Problem
                  </h4>

                  <p className="text-sm leading-7 text-muted-foreground">
                    {project.problem}
                  </p>
                </section>
              )}

              {project.solution && (
                <section className="space-y-3">
                  <h4 className="text-sm font-semibold uppercase tracking-wide">
                    Solution
                  </h4>

                  <p className="text-sm leading-7 text-muted-foreground">
                    {project.solution}
                  </p>
                </section>
              )}
            </div>
          )}

          {/* Technologies */}
          {project.project_skills.length > 0 && (
            <section className="space-y-3">
              <h4 className="text-sm font-semibold uppercase tracking-wide">
                Technologies
              </h4>

              <div className="flex flex-wrap gap-2">
                {project.project_skills.map((skill: any) => (
                  <div
                    key={skill.id}
                    className="rounded-md border bg-muted/40 px-3 py-1.5 text-sm"
                  >
                    {skill.name}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Timeline */}
          {(project.start_date || project.end_date) && (
            <section className="space-y-3">
              <h4 className="text-sm font-semibold uppercase tracking-wide">
                Timeline
              </h4>

              <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <span>
                  {project.start_date
                    ? formatDate(project.start_date)
                    : "Unknown"}
                </span>

                <span>→</span>

                <span>
                  {project.end_date ? formatDate(project.end_date) : "Present"}
                </span>
              </div>
            </section>
          )}

          {/* Links */}
          {(project.github_url || project.live_url) && (
            <section className="space-y-3 border-t pt-6">
              <h4 className="text-sm font-semibold uppercase tracking-wide">
                Links
              </h4>

              <div className="flex flex-wrap gap-3">
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
                  >
                    <FolderGit2 className="h-4 w-4" />
                    View on GitHub
                  </a>
                )}

                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View Live Project
                  </a>
                )}
              </div>
            </section>
          )}
        </div>
      </div>

      {deletingProject && (
        <DeleteProjectDialog
          project={project}
          open={!!deletingProject}
          onOpenChange={(open) => {
            if (!open) setDeletingProject(false);
          }}
        />
      )}
    </>
  );
};

export default ProjectDetails;
