import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "@/helpers/services/user.service";
import { userKeys } from "./queryKeys";


export function useUserDelete() {

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: number }) =>
      deleteUser(id),

    onSuccess: () => {

      queryClient.invalidateQueries({ queryKey: userKeys.all });
     
      
    },


  });
}
