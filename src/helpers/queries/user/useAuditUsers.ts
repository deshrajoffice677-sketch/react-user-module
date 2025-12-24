import { getAuditUsers } from "@/helpers/services/user.service";
import { useQuery } from "@tanstack/react-query";

export const useAuditUsers = () =>
  useQuery({
    queryKey: ["users", "audit"],
    queryFn: () => getAuditUsers(),
  }); 