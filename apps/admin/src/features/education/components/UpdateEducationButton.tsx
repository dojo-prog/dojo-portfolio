import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Pencil } from "lucide-react";
import { useState } from "react";
import type { EducationEntity } from "@dojo-portfolio/shared";
import UpdateEducationForm from "./UpdateEducationForm";

type Props = {
  education: EducationEntity;
};

const UpdateEducationButton = ({ education }: Props) => {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (value: boolean) => {
    setOpen(value);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button variant={"ghost"}>
            <Pencil className=" size-4" />
          </Button>
        }
      />

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Education Record</DialogTitle>

          <DialogDescription>
            Update an existing record from your portfolio.
          </DialogDescription>
        </DialogHeader>

        <UpdateEducationForm education={education} setDialogOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateEducationButton;
