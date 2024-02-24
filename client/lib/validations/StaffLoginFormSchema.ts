import { z } from 'zod';

export const staffFormSchema = z.object({
  staffID: z
    .string()
    .max(10, { message: 'Staff ID must be less than 10 characters' })
    .min(1, { message: 'Staff ID must be more than 1 character' }),

  password: z
    .string()
    .min(4, { message: 'Password must be more than 4 characters' }),
});
