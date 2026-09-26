import type { UpdateExperienceBody } from "@dojo-portfolio/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateExperience } from "../api/experience.api";
import { toast } from "sonner";
import { handleApiError } from "@/utils/errors/handleApiError";

type Variables = {
  experienceId: string;
  body: UpdateExperienceBody;
};

export const useUpdateExperience = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ experienceId, body }: Variables) =>
      updateExperience(experienceId, body),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experiences"] });

      toast.error("Experience successfully updated");
    },

    onError: handleApiError,
  });
};
