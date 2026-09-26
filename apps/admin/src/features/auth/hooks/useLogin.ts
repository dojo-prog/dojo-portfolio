import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../api/auth.api";
import { toast } from "sonner";
import { handleApiError } from "@/utils/errors/handleApiError";

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,

    onSuccess: (data) => {
      queryClient.setQueryData(["current-user"], data.data?.user);

      toast.success("Login successful");
    },

    onError: (error) => handleApiError(error),
  });
};
