import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRole } from "@/helpers/services/user.service";
import { userKeys } from "./queryKeys";

export function useUpdateRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, role }: { id: number; role: string }) =>
      updateRole(id, role),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.list() });
    }
  });
}
