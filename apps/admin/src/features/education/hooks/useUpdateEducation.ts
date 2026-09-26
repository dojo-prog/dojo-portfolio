import type { UpdateEducationBody } from "@dojo-portfolio/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateEducation } from "../api/education.api";
import { toast } from "sonner";
import { handleApiError } from "@/utils/errors/handleApiError";

type Variables = {
  educationId: string;
  body: UpdateEducationBody;
};

export const useUpdateEducation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ educationId, body }: Variables) =>
      updateEducation(educationId, body),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["educations"] });

      toast.success("Education record successfully updated");
    },

    onError: handleApiError,
  });
};
