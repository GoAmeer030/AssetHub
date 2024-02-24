import { z } from 'zod';

export const staffRegisterFormSchema = z.object({
  staffID: z
    .string()
    .min(1, {
      message: 'ID cannot be empty',
    })
    .max(10, {
      message: 'Staff ID must be less than 10 characters',
    }),

  password: z
    .string()
    .min(1, {
      message: 'Password is required',
    })
    .min(4, {
      message: 'Password should be at least 4 characters long',
    }),

  staffName: z.string().min(1, {
    message: 'Staff Name is required',
  }),

  designation: z.string().min(1, {
    message: 'Designation is required',
  }),
});
