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
import type { SkillEntity } from "@dojo-portfolio/shared";
import ButtonLoader from "@/components/common/ButtonLoader";
import { useDeleteSkill } from "../hooks/useDeleteSkill";

type Props = {
  skill: SkillEntity;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const DeleteSkillDialog = ({ skill, open, onOpenChange }: Props) => {
  const { mutate: deleteSkill, isPending } = useDeleteSkill();

  const handleDeleteSkill = () => {
    deleteSkill(skill.id, {
      onSuccess: () => {
        onOpenChange(false);
      },
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{`Delete skill (${skill.name})?`}</AlertDialogTitle>

          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the skill
            from the database.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant={"destructive"}
            onClick={handleDeleteSkill}
          >
            <ButtonLoader isLoading={isPending}>Delete Skill</ButtonLoader>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteSkillDialog;
