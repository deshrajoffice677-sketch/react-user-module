import { reinstateUser } from "@/helpers/services/user.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { userKeys } from "./queryKeys";

export const useReinstateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => reinstateUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all });
      queryClient.invalidateQueries({ queryKey: ["users", "banned"] });

    },

  });
};
