'use client';

import { useMutation } from '@tanstack/react-query';

import { getAssets, postAddAsset } from '@/api/assetApi';

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
  const mutation = useMutation({
    mutationFn: getAssets,
    retry: false,
  });
  return mutation;
}
