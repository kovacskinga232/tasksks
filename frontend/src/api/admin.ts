import apiClient from './client';

const ADMIN_BASE = '/api/admin/users';

export const fetchActiveTaskCount = async (): Promise<number> => {
  const res = await apiClient.get<number>(`${ADMIN_BASE}/stats/active-tasks`);
  return res.data;
};

export const updateUserRole = async (id: number, newRole: string): Promise<void> => {
  await apiClient.put(`${ADMIN_BASE}/${id}/role`, newRole, {
    headers: { 'Content-Type': 'text/plain' },
  });
};
