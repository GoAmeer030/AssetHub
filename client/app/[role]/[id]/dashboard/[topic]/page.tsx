'use client';

import { useParams, useRouter } from 'next/navigation';
import { use, useEffect } from 'react';

import AddAssetDialog from '@/components/adddialog/AddAssetDialog';
import AssetSearchCard from '@/components/searchcard/AssetSearchCard';
import ShowAssets from '@/components/show/ShowAssets';

import { useVerifyToken } from '@/hooks/auth/verifyTokenHook';

import { useParamStore } from '@/stores/paramStore';

export default function Page() {
  useVerifyToken();

  const params = useParams();
  const router = useRouter();

  const role = Array.isArray(params.role) ? params.role[0] : params.role;
  const userId = Array.isArray(params.id) ? params.id[0] : params.id;

  const topicId = Array.isArray(params.topic) ? params.topic[0] : params.topic;

  const { assets, searchAssetResultTrigger, searchAssets, setPage } =
    useParamStore();

  useEffect(() => {
    setPage('asset');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!(role === 'staff' || role === 'student')) {
      router.push('/auth/signin');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role]);

  return (
    <div className="w-[90%] m-auto pt-4">
      <AddAssetDialog />

      <div className="flex flex-col md:flex-row gap-4">
        <AssetSearchCard topicId={topicId} />
      </div>

      <div className="mt-5">
        {searchAssetResultTrigger && (
          <ShowAssets lable={'Assets for your search'} assets={searchAssets} />
        )}
        <ShowAssets lable={'Assets for you'} assets={assets} />
      </div>

      <div className="h-[15vh]"></div>
    </div>
  );
}
