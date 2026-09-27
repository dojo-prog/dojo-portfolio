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
import AddEducationForm from "./AddEducationForm";

const AddEducationButton = () => {
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
            Add Record
          </Button>
        }
      />

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Education Record</DialogTitle>

          <DialogDescription>
            Add a new education record to your portfolio.
          </DialogDescription>
        </DialogHeader>

        <AddEducationForm setDialogOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default AddEducationButton;
