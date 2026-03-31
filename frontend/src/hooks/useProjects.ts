import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchProjectById, fetchProjects, createProject, updateProject, deleteProject } from '../api/projects';
import { ProjectRequest } from '../models/payload/ProjectRequest';

export const useProject = (id: number) => {
  return useQuery({
    queryKey: ['projects', id],
    queryFn: () => fetchProjectById(id),
    enabled: !!id,
  });
};

export const useProjects = (page: number = 0) => {
  return useQuery({
    queryKey: ['projects', 'list', page],
    queryFn: () => fetchProjects(page),
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (project: ProjectRequest) => createProject(project),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['projects', 'list'] });
    },
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, project }: { id: number; project: ProjectRequest }) => updateProject(id, project),
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({ queryKey: ['projects', variables.id] });
      await queryClient.invalidateQueries({ queryKey: ['projects', 'list'] });
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteProject(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['projects', 'list'] });
    },
  });
};
