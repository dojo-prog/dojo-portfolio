import ContactMessageCard from "@/features/contacts/components/ContactMessageCard";
import { useScroll } from "@/hooks/useScroll";
import type { ContactMessage } from "@dojo-portfolio/shared";

type Props = {
  messages: ContactMessage[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => Promise<unknown>;
};

const MessageList = ({
  messages,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: Props) => {
  const { observerRef } = useScroll({
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  });

  return (
    <div className="space-y-3">
      {messages.map((message) => (
        <ContactMessageCard message={message} />
      ))}

      {hasNextPage && <div ref={observerRef} className="h-1" />}
    </div>
  );
};

export default MessageList;
