import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProjectSkills } from "../api/project.api";
import type { UpdateProjectSkillsBody } from "@dojo-portfolio/shared";
import { toast } from "sonner";
import { handleApiError } from "@/utils/errors/handleApiError";

type Variables = {
  projectId: string;
  body: UpdateProjectSkillsBody;
};

export const useUpdateProjectSkills = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ projectId, body }: Variables) =>
      updateProjectSkills(projectId, body),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });

      toast.success("Updated project's skills successfully");
    },

    onError: handleApiError,
  });
};
