import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchAllUsers,
  fetchUserById,
  deleteUser,
  fetchUserTasks,
  addTaskToUser,
  removeTaskFromUser,
} from '../api/users';
import { TaskFormRequest } from '../models/payload/TaskFormRequest';
import { TaskResponse } from '../models/payload/TaskResponse';

export const useUsers = (page: number = 0) =>
  useQuery({
    queryKey: ['users', page],
    queryFn: () => fetchAllUsers(page),
  });

export const useUser = (id: number) =>
  useQuery({
    queryKey: ['users', id],
    queryFn: () => fetchUserById(id),
    enabled: !!id,
  });

export const useDeleteUser = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteUser(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['users'] }),
  });
};

export const useUserTasks = (userId: number, page: number = 0) =>
  useQuery({
    queryKey: ['users', userId, 'tasks', page],
    queryFn: () => fetchUserTasks(userId, page),
    enabled: !!userId,
  });

export const useAddTaskToUser = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, task }: { userId: number; task: TaskFormRequest }) => addTaskToUser(userId, task),
    onSuccess: async (createdTask: TaskResponse, vars) => {
      qc.setQueryData(['tasks', createdTask.id], createdTask);
      await qc.invalidateQueries({ queryKey: ['tasks'] });
      await qc.invalidateQueries({ queryKey: ['users', vars.userId] });
      await qc.invalidateQueries({ queryKey: ['users', vars.userId, 'tasks'] });

      if (createdTask.projectId) {
        await qc.invalidateQueries({ queryKey: ['projects', createdTask.projectId] });
      }
    },
  });
};

export const useRemoveTaskFromUser = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, taskId }: { userId: number; taskId: number }) => removeTaskFromUser(userId, taskId),
    onSuccess: (_, vars) => qc.invalidateQueries({ queryKey: ['users', vars.userId, 'tasks'] }),
  });
};
