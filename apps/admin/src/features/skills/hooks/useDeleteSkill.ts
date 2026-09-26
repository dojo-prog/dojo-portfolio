import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSkill } from "../api/skill.api";
import { toast } from "sonner";
import { handleApiError } from "@/utils/errors/handleApiError";

export const useDeleteSkill = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSkill,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });

      toast.success("Skill successfully deleted");
    },

    onError: handleApiError,
  });
};
