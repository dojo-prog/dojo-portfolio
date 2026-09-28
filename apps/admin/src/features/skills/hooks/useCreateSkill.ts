import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSkill } from "../api/skill.api";
import { toast } from "sonner";
import { handleApiError } from "@/utils/errors/handleApiError";

export const useCreateSkill = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSkill,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });

      queryClient.invalidateQueries({ queryKey: ["dashboard-overview"] });

      toast.success("Skill successfully created");
    },

    onError: handleApiError,
  });
};
