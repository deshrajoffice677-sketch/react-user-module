import { useQuery } from '@tanstack/react-query';
import { userKeys } from './queryKeys';
import { getUsers } from '@/helpers/services/user.service';

export function useUsers() {
  return useQuery({
    queryKey: [...userKeys.list()], // caching per-filter
    queryFn: () => getUsers(),        // pass filters to API
    staleTime: 1000 * 60,
    retry: 2,
  });
}
