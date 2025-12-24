import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStatus } from "@/helpers/services/user.service";
import { userKeys } from "./queryKeys";
import { toast } from "sonner";

export function useUpdateStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) =>
      updateStatus(id, status),

    onSuccess: () => {
        toast.success("User status changed successfully");
      queryClient.invalidateQueries({ queryKey: userKeys.all });
    },
     onError:()=>{
      toast.error("Failed to status change for this user");
    }
  });
}
