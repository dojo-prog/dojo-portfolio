import { Mail, MailOpen, User } from "lucide-react";

import type { ContactMessage } from "@dojo-portfolio/shared";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useReadContactMessage } from "../hooks/useReadContactMessage";
import { useEffect } from "react";

type Props = {
  message: ContactMessage;
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const MessageDetailsDialog = ({
  message,
  dialogOpen,
  setDialogOpen,
}: Props) => {
  const { mutate: readMessage, isPending } = useReadContactMessage();

  useEffect(() => {
    readMessage(message.id);
  }, []);

  if (isPending) return null;

  const createdAt = new Date(message.created_at);
  const updatedAt = message.updated_at ? new Date(message.updated_at) : null;

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4 pr-8">
            <div className="min-w-0">
              <DialogTitle className="text-xl">{message.subject}</DialogTitle>

              <DialogDescription className="mt-1">
                Contact message details
              </DialogDescription>
            </div>

            <Badge
              variant={message.read_at ? "secondary" : "default"}
              className="shrink-0"
            >
              {message.read_at ? (
                <>
                  <MailOpen className="mr-1.5 size-3.5" />
                  Read
                </>
              ) : (
                <>
                  <Mail className="mr-1.5 size-3.5" />
                  Unread
                </>
              )}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Sender */}
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted">
              <User className="size-5 text-muted-foreground" />
            </div>

            <div className="min-w-0">
              <p className="font-medium">{message.name}</p>

              <a
                href={`mailto:${message.email}`}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {message.email}
              </a>
            </div>
          </div>

          <Separator />

          {/* Message */}
          <div>
            <p className="mb-2 text-sm font-medium">Message</p>

            <div className="rounded-lg border bg-muted/30 p-4">
              <p className="whitespace-pre-wrap text-sm leading-7 text-foreground/90">
                {message.message}
              </p>
            </div>
          </div>

          {/* Metadata */}
          <div className="grid gap-4 text-sm sm:grid-cols-2">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Received
              </p>

              <p className="mt-1">
                {createdAt.toLocaleString(undefined, {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </p>
            </div>

            {updatedAt && (
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Updated
                </p>

                <p className="mt-1">
                  {updatedAt.toLocaleString(undefined, {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MessageDetailsDialog;
