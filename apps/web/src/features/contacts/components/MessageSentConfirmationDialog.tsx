import { CheckCircle2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import type { Dispatch, SetStateAction } from "react";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const MessageSentConfirmationDialog = ({ open, setOpen }: Props) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="overflow-hidden p-0 max-w-lg ">
        {/* Success accent */}
        <div className="h-1.5 w-full bg-primary" />

        <div className="px-6 pt-16 pb-20 sm:px-8">
          <DialogHeader className="items-center text-center">
            {/* Icon */}
            <div className="relative mb-5">
              <div className="absolute inset-0 scale-125 rounded-full bg-primary/10 blur-xl" />

              <div className="relative flex size-30 items-center justify-center rounded-full border bg-primary/10">
                <CheckCircle2
                  className="size-20 text-primary"
                  strokeWidth={2}
                />
              </div>
            </div>

            <DialogTitle className="text-5xl font-semibold tracking-tight">
              Message sent!
            </DialogTitle>

            <DialogDescription className="mt-2 leading-6 italic">
              Thanks for reaching out. I'll get back to you as soon as I can.
            </DialogDescription>
          </DialogHeader>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MessageSentConfirmationDialog;
