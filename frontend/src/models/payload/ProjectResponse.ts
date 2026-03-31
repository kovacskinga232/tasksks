import { TaskResponse } from './TaskResponse';

export interface ProjectResponse {
  id: number;
  name: string;
  description: string;
  createdAt: string;
}

export interface ProjectDetailResponse {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  tasks: TaskResponse[];
}
