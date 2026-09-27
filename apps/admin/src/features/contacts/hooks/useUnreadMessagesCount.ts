import { useQuery } from "@tanstack/react-query";
import { fetchUnreadMessagesCount } from "../api/contact.api";

export const useUnreadMessagesCount = () => {
  return useQuery({
    queryKey: ["unread-messages-count"],
    queryFn: async () => {
      const res = await fetchUnreadMessagesCount();
      return res.data?.unread_count;
    },
  });
};
