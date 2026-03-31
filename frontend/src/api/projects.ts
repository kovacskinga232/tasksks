import { ProjectDetailResponse, ProjectResponse } from '../models/payload/ProjectResponse';
import apiClient from './client';
import { ProjectRequest } from '../models/payload/ProjectRequest';
import { PageResponse } from '../models/PageResponse';

const PROJECT_BASE = '/api/projects';

export const fetchProjectById = async (id: number): Promise<ProjectDetailResponse> => {
  const response = await apiClient.get(`${PROJECT_BASE}/${id}`);
  return response.data;
};

export const createProject = async (project: ProjectRequest): Promise<ProjectResponse> => {
  const response = await apiClient.post<ProjectResponse>(PROJECT_BASE, project);
  return response.data;
};

export const updateProject = async (id: number, project: ProjectRequest): Promise<ProjectResponse> => {
  const response = await apiClient.put<ProjectResponse>(`${PROJECT_BASE}/${id}`, project);
  return response.data;
};

export const deleteProject = async (id: number): Promise<void> => {
  await apiClient.delete(`${PROJECT_BASE}/${id}`);
};

export const fetchProjects = async (page: number = 0, size: number = 12): Promise<PageResponse<ProjectResponse>> => {
  const response = await apiClient.get<PageResponse<ProjectResponse>>(PROJECT_BASE, {
    params: { page, size },
  });

  return response.data;
};
