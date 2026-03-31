import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchTaskById, updateTask, deleteTask, fetchFilteredTasks } from '../api/tasks';
import { TaskFormRequest } from '../models/payload/TaskFormRequest';
import { TaskFilters } from '../models/TaskFilters';

export const useTask = (id: number) => {
  return useQuery({
    queryKey: ['tasks', id],
    queryFn: () => fetchTaskById(id),
    enabled: !!id,
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, task }: { id: number; task: TaskFormRequest }) => updateTask(id, task),
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({ queryKey: ['tasks'] });
      await queryClient.invalidateQueries({ queryKey: ['tasks', variables.id] });
      await queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteTask(id),
    onSuccess: async (_, id) => {
      await queryClient.invalidateQueries({ queryKey: ['tasks'] });
      await queryClient.invalidateQueries({ queryKey: ['users'] });
      await queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.removeQueries({ queryKey: ['tasks', id] });
    },
  });
};

export const useFilteredTasks = (filters: TaskFilters, page: number) => {
  return useQuery({
    queryKey: ['tasks', 'search', filters, page],
    queryFn: () => fetchFilteredTasks(filters, page),
  });
};
