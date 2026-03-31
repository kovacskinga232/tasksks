import { z } from 'zod';

export const projectSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: 'validation.project.name.min' })
    .max(100, { message: 'validation.project.name.max' }),

  description: z.string().trim().max(500, { message: 'validation.project.description.max' }).or(z.literal('')),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;
