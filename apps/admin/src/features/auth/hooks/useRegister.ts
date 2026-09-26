import { useMutation, useQueryClient } from "@tanstack/react-query";
import { register } from "../api/auth.api";
import type { UserPublic } from "@dojo-portfolio/shared";
import { handleApiError } from "@/utils/errors/handleApiError";
import { toast } from "sonner";

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: register,

    onSuccess: (data) => {
      const user = data.data?.user;

      if (!user) return;

      queryClient.setQueryData<UserPublic[]>(["users"], (old) => {
        if (!old) return [user];

        return [user, ...old];
      });

      toast.success("User successfully registered");
    },

    onError: handleApiError,
  });
};
