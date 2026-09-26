import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEducation } from "../api/education.api";
import { toast } from "sonner";
import { handleApiError } from "@/utils/errors/handleApiError";

export const useCreateEducation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createEducation,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["educations"] });

      toast.success("Education record successfully created");
    },

    onError: handleApiError,
  });
};
