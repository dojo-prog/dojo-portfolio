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
import type { EducationEntity } from "@dojo-portfolio/shared";
import ButtonLoader from "@/components/common/ButtonLoader";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import { useDeleteEducation } from "../hooks/useDeleteEducation";

type Props = {
  education: EducationEntity;
};

const DeleteEducationButton = ({ education }: Props) => {
  const [open, setOpen] = useState(false);

  const { mutate: deleteSkill, isPending } = useDeleteEducation();

  const handleDeleteSkill = () => {
    deleteSkill(education.id, {
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
          <AlertDialogTitle>{`Delete education record from (${education.institution})?`}</AlertDialogTitle>

          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            education record from the database.
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

export default DeleteEducationButton;
