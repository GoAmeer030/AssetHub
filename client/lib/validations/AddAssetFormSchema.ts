import { z } from 'zod';

export const addAssetFormSchema = z
  .object({
    assetname: z
      .string()
      .min(5, { message: 'Asset name should have at least 5 characters' })
      .max(30, { message: 'Asset name should have at most 30 characters' }),
    assettype: z.string().min(1, { message: 'Asset type is required' }),
    asseturl: z.string().optional(),
    file: z.any().optional(),
  })
  .refine((data) => (data.asseturl ? !data.file : data.file), {
    message: 'Only one of asseturl or file should exist',
  });
