import { useMutation, useQueryClient } from "@tanstack/react-query";
import { readContactMessage } from "../api/contact.api";

export const useReadContactMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: readContactMessage,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact-messages"] });
    },
  });
};
