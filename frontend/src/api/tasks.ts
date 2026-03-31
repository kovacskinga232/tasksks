import apiClient from './client';
import { TaskResponse } from '../models/payload/TaskResponse';
import { TaskFormRequest } from '../models/payload/TaskFormRequest';
import { TaskFilters } from '../models/TaskFilters';
import { PageResponse } from '../models/PageResponse';

const TASKS_BASE = '/api/tasks';

export const fetchTaskById = async (id: number): Promise<TaskResponse> => {
  const response = await apiClient.get(`${TASKS_BASE}/${id}`);
  return response.data;
};

export const updateTask = async (id: number, task: TaskFormRequest): Promise<TaskResponse> => {
  const response = await apiClient.put<TaskResponse>(`${TASKS_BASE}/${id}`, task);
  return response.data;
};

export const deleteTask = async (id: number): Promise<void> => {
  await apiClient.delete(`${TASKS_BASE}/${id}`);
};

export const fetchFilteredTasks = async (
  filters: TaskFilters,
  page: number = 0,
): Promise<PageResponse<TaskResponse>> => {
  const response = await apiClient.get<PageResponse<TaskResponse>>(`${TASKS_BASE}/filter`, {
    params: {
      ...filters,
      page,
      size: 12,
    },
  });
  return response.data;
};
