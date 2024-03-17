'use client';

import { getStaffDetail } from '@/api/userApi';
import { useMutation } from '@tanstack/react-query';

import { useToast } from '@/components/ui/use-toast';

export function useGetStaffDetails() {
  const { toast } = useToast();
  const mutation = useMutation({
    mutationFn: getStaffDetail,
    onError: (error) => {
      toast({
        description:
          error.message ||
          'Error while getting the staff detail!! Please try again later or contact developer',
        variant: 'destructive',
      });
    },
  });

  return mutation;
}
