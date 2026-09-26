import { useQuery } from "@tanstack/react-query";
import { fetchUnreadMessagesCount } from "../api/contact.api";

export const useUnreadMessagesCount = () => {
  return useQuery({
    queryKey: ["unread-messages-count"],
    queryFn: fetchUnreadMessagesCount,
  });
};
