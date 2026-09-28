import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProject } from "../api/project.api";
import { toast } from "sonner";
import { handleApiError } from "@/utils/errors/handleApiError";

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProject,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });

      queryClient.invalidateQueries({ queryKey: ["dashboard-overview"] });

      toast.success("Project successfully created");
    },

    onError: handleApiError,
  });
};
