import type { UpdateProjectBody } from "@dojo-portfolio/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProject } from "../api/project.api";
import { toast } from "sonner";
import { handleApiError } from "@/utils/errors/handleApiError";

type Variables = {
  projectId: string;
  body: UpdateProjectBody;
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ projectId, body }: Variables) =>
      updateProject(projectId, body),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });

      toast.success("Project successfully updated");
    },

    onError: handleApiError,
  });
};
