import apiClient from './client';
import { UserResponse } from '../models/payload/UserResponse';
import { TaskResponse } from '../models/payload/TaskResponse';
import { TaskFormRequest } from '../models/payload/TaskFormRequest';
import { PageResponse } from '../models/PageResponse';

const USERS_BASE = '/api/users';

export const fetchAllUsers = async (page: number = 0): Promise<PageResponse<UserResponse>> => {
  const res = await apiClient.get<PageResponse<UserResponse>>(USERS_BASE, {
    params: { page, size: 10 },
  });
  return res.data;
};

export const fetchUserById = async (id: number): Promise<UserResponse> => {
  const res = await apiClient.get<UserResponse>(`${USERS_BASE}/${id}`);
  return res.data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await apiClient.delete(`${USERS_BASE}/${id}`);
};

export const fetchUserTasks = async (userId: number, page: number = 0): Promise<PageResponse<TaskResponse>> => {
  const res = await apiClient.get<PageResponse<TaskResponse>>(`${USERS_BASE}/${userId}/tasks`, {
    params: { page, size: 10 },
  });
  return res.data;
};

export const addTaskToUser = async (userId: number, task: TaskFormRequest): Promise<TaskResponse> => {
  const res = await apiClient.post<TaskResponse>(`${USERS_BASE}/${userId}/tasks`, task);
  return res.data;
};

export const removeTaskFromUser = async (userId: number, taskId: number): Promise<void> => {
  await apiClient.delete(`${USERS_BASE}/${userId}/tasks/${taskId}`);
};

export async function updateUserLocale(locale: string): Promise<void> {
  await apiClient.put(`${USERS_BASE}/me/locale`, { locale });
}

export async function fetchUserLocale(): Promise<string> {
  const res = await apiClient.get<{ locale: string }>(`${USERS_BASE}/me/locale`);
  return res.data.locale;
}
