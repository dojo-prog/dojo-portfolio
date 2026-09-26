import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteEducation } from "../api/education.api";
import { toast } from "sonner";
import { handleApiError } from "@/utils/errors/handleApiError";

export const useDeleteEducation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteEducation,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["educations"] });

      toast.success("Education successfully deleted");
    },

    onError: handleApiError,
  });
};
