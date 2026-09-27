import type { ContactMessage } from "@dojo-portfolio/shared";
import { useState } from "react";
import MessageDetailsDialog from "./MessageDetailsDialog";

type Props = {
  message: ContactMessage;
};

const ContactMessageCard = ({ message }: Props) => {
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);

  return (
    <>
      <article
        onClick={() => setDetailsDialogOpen(true)}
        key={message.id}
        className={`group cursor-pointer rounded-xl border bg-card p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
          !message.read_at ? "border-primary/30 bg-primary/2" : ""
        }`}
      >
        <div className="flex items-start gap-4">
          {/* Unread indicator */}
          <div className="pt-2">
            <span
              className={`block size-2.5 rounded-full ${
                !message.read_at ? "bg-primary" : "bg-transparent"
              }`}
            />
          </div>

          {/* Message content */}
          <div className="min-w-0 flex-1">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <div className="min-w-0">
                <h2
                  className={`truncate text-sm ${
                    !message.read_at ? "font-semibold" : "font-medium"
                  }`}
                >
                  {message.name}
                </h2>

                <p className="truncate text-xs text-muted-foreground">
                  {message.email}
                </p>
              </div>

              <time
                dateTime={message.created_at}
                className="shrink-0 text-xs text-muted-foreground"
              >
                {new Date(message.created_at).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
            </div>

            <div className="mt-3">
              <h3
                className={`truncate text-sm ${
                  !message.read_at ? "font-semibold" : "font-medium"
                }`}
              >
                {message.subject}
              </h3>

              <p className="mt-1 line-clamp-2 text-sm leading-6 text-muted-foreground">
                {message.message}
              </p>
            </div>
          </div>
        </div>
      </article>

      {detailsDialogOpen && (
        <MessageDetailsDialog
          message={message}
          dialogOpen={detailsDialogOpen}
          setDialogOpen={setDetailsDialogOpen}
        />
      )}
    </>
  );
};

export default ContactMessageCard;
