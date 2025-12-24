import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "@/helpers/services/user.service";
import { userKeys } from "./queryKeys";
import { toast } from "sonner";

export function useUserDelete() {

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: number }) =>
      deleteUser(id),

    onSuccess: () => {
      toast.success('User deleted successfully!')
      queryClient.invalidateQueries({ queryKey: userKeys.all });
     
      
    },

    onError:()=>{
      toast.error("Failed to delete user");
    }
  });
}
