'use client';

import { useParamStore } from '@/stores/paramStore';

import { useGetAssetsMutation } from '@/hooks/assetHook';
import { useEffect } from 'react';

export default function AssetSearchCard({ topicId }: { topicId: string }) {
  const { setAssets } = useParamStore();

  const mutation = useGetAssetsMutation();

  useEffect(() => {
    mutation.mutate(topicId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicId]);

  useEffect(() => {
    if (mutation.isSuccess) {
      setAssets(mutation.data?.data?.asset);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutation.isSuccess]);

  return (
    <div>
      <p>this is a search card</p>
    </div>
  );
}
