import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().min(3, { message: 'validation.username.min' }).max(25, { message: 'validation.username.max' }),
  password: z.string().min(6, { message: 'validation.password.min' }).max(72, { message: 'validation.password.max' }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
