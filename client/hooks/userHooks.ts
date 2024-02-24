'use client';

import { useMutation } from '@tanstack/react-query';

import { getStaffDetail } from '@/api/userApi';

export function useGetStaffDetails() {
  const mutation = useMutation({
    mutationFn: getStaffDetail,
  });

  return mutation;
}
