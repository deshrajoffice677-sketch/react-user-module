import { useQuery } from '@tanstack/react-query';
import { userKeys } from './queryKeys';
import { getUser } from '@/helpers/services/user.service';

export function useUser(id: number) {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => getUser(id),
    enabled: !!id,
  });
}
