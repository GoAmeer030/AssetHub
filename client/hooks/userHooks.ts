'use client';

import { getStaffDetail } from '@/api/userApi';
import { useMutation } from '@tanstack/react-query';

export function useGetStaffDetails() {
  const mutation = useMutation({
    mutationFn: getStaffDetail,
  });

  return mutation;
}
