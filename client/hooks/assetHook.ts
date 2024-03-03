'use client';

import { useMutation } from '@tanstack/react-query';

import { getAssets } from '@/api/assetApi';

export function useGetAssetsMutation() {
  const mutation = useMutation({
    mutationFn: getAssets,
    retry: false,
  });
  return mutation;
}
