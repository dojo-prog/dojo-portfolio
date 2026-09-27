import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { ExperienceEntity } from "@dojo-portfolio/shared";
import ButtonLoader from "@/components/common/ButtonLoader";
import { useDeleteExperience } from "../hooks/useDeleteExperience";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";

type Props = {
  experience: ExperienceEntity;
};

const DeleteExperienceButton = ({ experience }: Props) => {
  const [open, setOpen] = useState(false);

  const { mutate: deleteSkill, isPending } = useDeleteExperience();

  const handleDeleteSkill = () => {
    deleteSkill(experience.id, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        render={
          <Button variant={"destructive"}>
            <Trash2Icon className=" size-4" />
          </Button>
        }
      />

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{`Delete experience record from (${experience.company})?`}</AlertDialogTitle>

          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            experience record from the database.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant={"destructive"}
            onClick={handleDeleteSkill}
          >
            <ButtonLoader isLoading={isPending}>Delete Record</ButtonLoader>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteExperienceButton;
