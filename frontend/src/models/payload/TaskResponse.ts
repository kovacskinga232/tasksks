import { Priority } from '../enums/Priority';
import { Tag } from '../enums/Tag';

export interface TaskResponse {
  id: number;
  uuid?: string;
  title: string;
  description: string;
  dueDate: string;
  priority: Priority;
  tag: Tag;
  completed: boolean;
  projectId: number;
  projectName: string;
}
