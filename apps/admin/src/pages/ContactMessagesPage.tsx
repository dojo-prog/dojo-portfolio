import { useState } from "react";
import Empty from "@/components/common/Empty";
import type { ContactMessageQuery } from "@dojo-portfolio/shared";
import { useContactMessages } from "@/features/contacts/hooks/useContactMessages";
import Header from "./contact-messages/Header";
import MessageList from "./contact-messages/MessageList";
import MessageFilters from "./contact-messages/MessageFilters";
import { useDebounce } from "@/hooks/useDebounce";

const ContactMessagesPage = () => {
  const [filters, setFilters] = useState<ContactMessageQuery>({
    page: 1,
    limit: 10,
    search: "",
    sort: undefined,
    unread: false,
  });

  const debouncedSearch = useDebounce(filters.search);

  const {
    data: messageData,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useContactMessages({ ...filters, search: debouncedSearch });

  const messages = messageData?.pages.flatMap((p) => p!.messages) ?? [];

  return (
    <main className="space-y-8">
      {/* Header */}
      <Header />

      {/* Filters */}
      <MessageFilters filters={filters} setFilters={setFilters} />

      {/* Messages */}
      {messages.length === 0 ? (
        <Empty
          title="No messages found"
          description="No messages match your current filters, or you haven't receive any message yet."
        />
      ) : (
        <MessageList
          messages={messages}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      )}
    </main>
  );
};

export default ContactMessagesPage;
