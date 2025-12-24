import { reinstateUser } from "@/helpers/services/user.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { userKeys } from "./queryKeys";

export const useReinstateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => reinstateUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all });
      queryClient.invalidateQueries({ queryKey: ["users", "banned"] });
      toast.success("User reinstated successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to reinstate user");
    },
  });
};
