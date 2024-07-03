import { z } from 'zod';

export const SignUpSchema = z.object({
  email: z.string().email({
    message: 'Invalid email address',
  }),
  password: z
    .string({ required_error: 'Password is required' })
    .min(8, { message: 'Password must be at least 8 characters' }),
});

export type SignUpData = z.infer<typeof SignUpSchema>;
