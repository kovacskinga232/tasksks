import { Priority } from './enums/Priority';
import { Tag } from './enums/Tag';

export interface TaskFilters {
  title?: string;
  priority?: Priority;
  tag?: Tag;
  completed?: boolean;
}
