import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/helpers/services/user.service";
import { userKeys } from "./queryKeys";

export function useUserDetail(id: number) {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => getUser(id),
    enabled: !!id,
  });
}
