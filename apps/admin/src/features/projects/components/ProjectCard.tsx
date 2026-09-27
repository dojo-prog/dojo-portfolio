import { useState } from "react";
import type { ProjectWithRelations } from "@dojo-portfolio/shared";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ProjectDetails from "./ProjectDetails";
import ProjectCardPreview from "./ProjectCardPreview";

type ProjectCardProps = {
  project: ProjectWithRelations;
};

const ProjectCard = ({ project }: ProjectCardProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <div>
            <ProjectCardPreview project={project} />
          </div>
        }
      />
      {/* Project Details */}
      <DialogContent className="flex max-h-[90vh] w-[95vw] max-w-3xl flex-col overflow-hidden p-0">
        <ProjectDetails project={project} />
      </DialogContent>
    </Dialog>
  );
};

export default ProjectCard;
