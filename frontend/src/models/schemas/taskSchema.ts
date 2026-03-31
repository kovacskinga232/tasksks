import { z } from 'zod';
import { Priority } from '../enums/Priority';
import { Tag } from '../enums/Tag';

export const taskSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'validation.task.title.required' })
    .max(100, { message: 'validation.task.title.max' }),
  description: z
    .string()
    .min(1, { message: 'validation.task.description.required' })
    .max(1000, { message: 'validation.task.description.max' }),
  dueDate: z.string().refine(
    (date) => {
      if (!date) {
        return false;
      }

      const selectedDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      return selectedDate >= today;
    },
    {
      message: 'validation.task.dueDate.invalid',
    },
  ),
  priority: z.enum(Object.values(Priority) as [Priority, ...Priority[]], {
    message: 'validation.task.priority.required',
  }),
  tag: z.enum(Object.values(Tag) as [Tag, ...Tag[]], {
    message: 'validation.task.tag.required',
  }),
  completed: z.boolean(),
  projectId: z.number().nullable().optional(),
});

export type TaskFormValues = z.infer<typeof taskSchema>;
