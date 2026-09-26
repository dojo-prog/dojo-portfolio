import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteContactMessage } from "../api/contact.api";
import { toast } from "sonner";
import { handleApiError } from "@/utils/errors/handleApiError";

export const useDeleteContactMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteContactMessage,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact-messages"] });

      toast.success("Contact message successfully deleted");
    },

    onError: handleApiError,
  });
};
