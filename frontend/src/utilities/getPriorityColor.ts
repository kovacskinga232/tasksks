import { ChipProps } from '@mui/material';
import { Priority } from '../models/enums/Priority';

export const getPriorityColor = (priority: Priority): ChipProps['color'] => {
  switch (priority) {
    case Priority.CRITICAL:
      return 'error';
    case Priority.HIGH:
      return 'warning';
    case Priority.MEDIUM:
      return 'info';
    case Priority.LOW:
      return 'success';
    default:
      return 'default';
  }
};
