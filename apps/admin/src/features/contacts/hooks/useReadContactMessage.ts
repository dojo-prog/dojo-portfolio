import { useMutation, useQueryClient } from "@tanstack/react-query";
import { readContactMessage } from "../api/contact.api";
import type { FetchUnreadMessageCountRes } from "../types/contact.types";

export const useReadContactMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: readContactMessage,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact-messages"] });

      queryClient.setQueryData<FetchUnreadMessageCountRes>(
        ["unread-messages-count"],
        (old) => {
          if (!old?.data || old.data.unread_count === 0) return old;

          return {
            ...old,
            data: {
              ...old.data,
              unread_count: old.data.unread_count - 1,
            },
          };
        },
      );
    },
  });
};
