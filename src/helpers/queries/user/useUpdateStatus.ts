import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStatus } from "@/helpers/services/user.service";
import { userKeys } from "./queryKeys";


export function useUpdateStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) =>
      updateStatus(id, status),

    onSuccess: () => {

      queryClient.invalidateQueries({ queryKey: userKeys.all });
    },

  });
}
