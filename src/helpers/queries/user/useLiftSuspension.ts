import { liftSuspension } from "@/helpers/services/user.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { userKeys } from "./queryKeys";

export const useLiftSuspension = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => liftSuspension(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all });
      queryClient.invalidateQueries({ queryKey: ["users", "suspended"] });

    },

  });
};
