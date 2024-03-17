'use client';

import { deleteAsset, getAssets, postAddAsset } from '@/api/assetApi';
import { useMutation } from '@tanstack/react-query';

import { useToast } from '@/components/ui/use-toast';

export function useAddAssetMutation() {
  const { toast } = useToast();
  const mutation = useMutation({
    mutationFn: postAddAsset,
    onSuccess: () => {},
    onError: () => {
      toast({
        title: 'Unable to create topic',
        description:
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

    onError: () => {
      toast({
        title: 'Unable to fetch assets',
        description:
          'Error while fetching assets! Please try again later or contact developer',
        variant: 'destructive',
      });
    },
  });

  return mutation;
}

export function useDeleteAssetMutation() {
  const { toast } = useToast();
  const mutation = useMutation({
    mutationFn: deleteAsset,
    onSuccess: () => {},
    onError: () => {
      toast({
        title: 'Unable to delete asset',
        description:
          'Error while deleting asset! Please try again later or contact developer',
        variant: 'destructive',
      });
    },
  });

  return mutation;
}
