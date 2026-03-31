import { Priority } from '../enums/Priority';
import { Tag } from '../enums/Tag';

export interface TaskFormRequest {
  title: string;
  description: string;
  dueDate: string;
  priority: Priority;
  tag: Tag;
  completed: boolean;
}
