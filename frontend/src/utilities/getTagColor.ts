import { Tag } from '../models/enums/Tag';

export const getTagColor = (tag: Tag): string => {
  const colors: Record<Tag, string> = {
    [Tag.WORK]: '#1976d2',
    [Tag.PERSONAL]: '#9c27b0',
    [Tag.SHOPPING]: '#ff9800',
    [Tag.HEALTH]: '#4caf50',
    [Tag.STUDY]: '#2196f3',
    [Tag.FAMILY]: '#e91e63',
  };

  return colors[tag] || '#607d8b';
};
