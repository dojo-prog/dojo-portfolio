import { useQuery } from "@tanstack/react-query";
import { fetchContactMessage } from "../api/contact.api";

export const useContactMessage = (contactMessageId: string) => {
  return useQuery({
    queryKey: ["contact-messages", contactMessageId],
    queryFn: () => fetchContactMessage(contactMessageId),
  });
};
