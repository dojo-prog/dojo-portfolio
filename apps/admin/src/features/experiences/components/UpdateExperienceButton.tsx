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
import UpdateExperienceForm from "./UpdateExperienceForm";
import type { ExperienceEntity } from "@dojo-portfolio/shared";

type Props = {
  experience: ExperienceEntity;
};

const UpdateExperienceButton = ({ experience }: Props) => {
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
          <DialogTitle>Update Experience</DialogTitle>

          <DialogDescription>
            Update an existing experience from your portfolio.
          </DialogDescription>
        </DialogHeader>

        <UpdateExperienceForm experience={experience} setDialogOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateExperienceButton;
