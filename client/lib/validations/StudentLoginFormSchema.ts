import { z } from 'zod';

export const studentFormSchema = z.object({
  regNo: z
    .string()
    .min(1, {
      message: 'Bro Enter Something',
    })
    .refine((value) => /^\d+$/.test(value), {
      message: 'Dont you see it is a field for Numbers',
      params: { regex: '/^\\d+$/' },
    })
    .refine((value) => /^7321/.test(value), {
      message:
        'Where are you studying? if Nandha College of Technology, then Register Number should start with 7321',
      params: { regex: '/^7321/' },
    })
    .refine((value) => /^\d{12}$/.test(value), {
      message:
        'Which year you are studying? the Register Number is 12 digits long',
      params: { regex: '/^\\d{12}$/' },
    }),
});
