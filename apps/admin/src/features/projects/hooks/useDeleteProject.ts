import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProject } from "../api/project.api";
import { toast } from "sonner";
import { handleApiError } from "@/utils/errors/handleApiError";

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProject,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });

      queryClient.invalidateQueries({ queryKey: ["dashboard-overview"] });

      toast.success("Project successfully deleted");
    },

    onError: handleApiError,
  });
};
