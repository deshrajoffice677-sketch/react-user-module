import { getBannedUsers } from "@/helpers/services/user.service";
import { useQuery } from "@tanstack/react-query";

export const useBannedUsers = () =>
  useQuery({
    queryKey: ["users", "banned"],
    queryFn: () => getBannedUsers(),
  });