import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Plus } from "lucide-react";
import { useState } from "react";
import AddExperienceForm from "./AddExperienceForm";

const AddExperienceButton = () => {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (value: boolean) => {
    setOpen(value);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button size="lg" className="px-4 text-white">
            <Plus className="mr-1 size-5" />
            Add Skill
          </Button>
        }
      />

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Skill</DialogTitle>

          <DialogDescription>
            Add a new skill to your portfolio.
          </DialogDescription>
        </DialogHeader>

        <AddExperienceForm setDialogOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default AddExperienceButton;
