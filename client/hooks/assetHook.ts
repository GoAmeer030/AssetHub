'use client';

import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';

import { useToast } from '@/components/ui/use-toast';

import { deleteAsset, getAssets, postAddAsset } from '@/api/assetApi';

export function useAddAssetMutation() {
  const { toast } = useToast();
  const mutation = useMutation({
    mutationFn: postAddAsset,
    onSuccess: () => {},
    onError: (error) => {
      toast({
        title: 'Unable to create topic',
        description:
          error.message ||
          'Error while creating topic! Please try again later or contact developer',
        variant: 'destructive',
      });
    },
  });

  return mutation;
}

export function useGetAssetsMutation() {
  const { toast } = useToast();
  const mutation = useMutation({
    mutationFn: getAssets,
    retry: false,

    onError: (error) => {
      toast({
        title: 'Unable to fetch assets',
        description:
          error.message ||
          'Error while fetching assets! Please try again later or contact developer',
        variant: 'destructive',
      });
    },
  });

  return mutation;
}

export function useDeleteAssetMutation() {
  const router = useRouter();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: deleteAsset,
    onSuccess: () => {
      router.refresh();
    },
    onError: (error) => {
      toast({
        title: 'Unable to delete asset',
        description:
          error.message ||
          'Error while deleting asset! Please try again later or contact developer',
        variant: 'destructive',
      });
    },
  });

  return mutation;
}
