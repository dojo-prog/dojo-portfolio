import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { ProjectWithRelations } from "@dojo-portfolio/shared";
import { useDeleteProject } from "../hooks/useDeleteProject";
import ButtonLoader from "@/components/common/ButtonLoader";

type Props = {
  project: ProjectWithRelations;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const DeleteProjectDialog = ({ project, open, onOpenChange }: Props) => {
  const { mutate: deleteProject, isPending } = useDeleteProject();

  const handleDeleteProject = () => {
    deleteProject(project.id, {
      onSuccess: () => {
        onOpenChange(false);
      },
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{`Delete project (${project.title})?`}</AlertDialogTitle>

          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            project from the database.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant={"destructive"}
            onClick={handleDeleteProject}
          >
            <ButtonLoader isLoading={isPending}>Delete Project</ButtonLoader>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteProjectDialog;
