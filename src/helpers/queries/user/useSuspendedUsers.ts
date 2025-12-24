import { getSuspendedUsers } from "@/helpers/services/user.service";
import { useQuery } from "@tanstack/react-query";

export const useSuspendedUsers = () =>
  useQuery({
    queryKey: ["users", "suspended"],
    queryFn: () => getSuspendedUsers(),
  });