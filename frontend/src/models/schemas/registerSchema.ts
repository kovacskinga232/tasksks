import { z } from 'zod';

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: 'validation.register.username.min' })
      .max(25, { message: 'validation.register.username.max' }),
    password: z
      .string()
      .min(6, { message: 'validation.register.password.min' })
      .max(72, { message: 'validation.register.password.max' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'validation.register.confirmPassword.match',
    path: ['confirmPassword'],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
