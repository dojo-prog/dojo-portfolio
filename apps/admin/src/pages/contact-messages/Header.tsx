import { useUnreadMessagesCount } from "@/features/contacts/hooks/useUnreadMessagesCount";

const Header = () => {
  const { data: unreadCount } = useUnreadMessagesCount();

  return (
    <header className="flex items-center justify-between pt-6">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-4xl font-semibold">Contact Messages</h1>

          {unreadCount !== undefined && unreadCount > 0 && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
              <span className="size-1.5 rounded-full bg-primary" />
              {unreadCount} unread
            </span>
          )}
        </div>

        <p className="mt-1 text-xs text-muted-foreground">
          View and manage messages sent through your contact form.
        </p>
      </div>
    </header>
  );
};

export default Header;
