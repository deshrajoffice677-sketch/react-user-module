import { liftSuspension } from "@/helpers/services/user.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { userKeys } from "./queryKeys";

export const useLiftSuspension = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => liftSuspension(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all });
      queryClient.invalidateQueries({ queryKey: ["users", "suspended"] });
      toast.success("User suspension lifted successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to lift suspension");
    },
  });
};
