import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteExperience } from "../api/experience.api";
import { toast } from "sonner";
import { handleApiError } from "@/utils/errors/handleApiError";

export const useDeleteExperience = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteExperience,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experiences"] });

      toast.success("Experience successfully deleted");
    },

    onError: handleApiError,
  });
};
