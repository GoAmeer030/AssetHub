import { z } from 'zod';

export const contactFormSchema = z.object({
  message: z
    .string()
    .min(10, { message: 'Message should have at least 10 characters' }),
});
