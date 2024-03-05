import { z } from 'zod';

export const addTopicFormSchema = z.object({
  syllabus: z
    .string()
    .refine((value) => /^\d{4}$/.test(value), {
      message: 'Syllabus should be a 4-digit number represting the year.',
      params: { regex: '/^\\d{4}$/' },
    })
    .refine((value) => parseInt(value) % 4 === 1, {
      message:
        'Syllabus regulation year you entered is not valid, Please refer online for the correct year.',
    }),

  department: z.string().min(1, { message: 'Please select a department.' }),

  year: z.string().min(1, { message: 'Year is required' }),

  semester: z.string().min(1, { message: 'Semester is required' }),

  subjectcode: z.string().length(6, {
    message: 'Subject Code should be exactly 6 letters long',
  }),

  topicname: z
    .string()
    .min(5, { message: 'Topic name should have at least 5 characters' })
    .max(30, { message: 'Topic name should have at most 30 characters' }),
});
