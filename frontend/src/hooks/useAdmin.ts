import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchActiveTaskCount, updateUserRole } from '../api/admin';

export const useActiveTaskCount = () => {
  return useQuery({
    queryKey: ['admin', 'stats', 'active-tasks'],
    queryFn: fetchActiveTaskCount,
    refetchInterval: 30000,
  });
};

export const useUpdateRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, role }: { id: number; role: string }) => updateUserRole(id, role),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};
