import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createExperience } from "../api/experience.api";
import { toast } from "sonner";
import { handleApiError } from "@/utils/errors/handleApiError";

export const useCreateExperience = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createExperience,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experiences"] });

      queryClient.invalidateQueries({ queryKey: ["dashboard-overview"] });

      toast.success("Experience successfully created");
    },

    onError: handleApiError,
  });
};
