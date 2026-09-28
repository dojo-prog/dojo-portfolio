import { useMutation } from "@tanstack/react-query";
import { createMessage } from "../api/contact-message.api";

export const useCreateMessage = () => {
  return useMutation({
    mutationFn: createMessage,
  });
};
