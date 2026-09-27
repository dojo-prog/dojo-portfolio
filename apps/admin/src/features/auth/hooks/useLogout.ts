import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../api/auth.api";
import { toast } from "sonner";
import { handleApiError } from "@/utils/errors/handleApiError";

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,

    onSuccess: () => {
      queryClient.setQueryData(["current-user"], null);

      toast.success("Logout successful");
    },

    onError: handleApiError,
  });
};
