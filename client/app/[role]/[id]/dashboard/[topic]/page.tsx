'use client';

import { useParams, useRouter } from 'next/navigation';

import { useParamStore } from '@/stores/paramStore';

import ShowAssets from '@/components/ShowAssets';
import AssetSearchCard from '@/components/AssetSearchCard';

export default function Page() {
  const params = useParams();
  const router = useRouter();

  const role = Array.isArray(params.role) ? params.role[0] : params.role;
  const userId = Array.isArray(params.id) ? params.id[0] : params.id;
  role === 'staff' || role === 'student' ? null : router.push('/auth/signin');

  const topicId = Array.isArray(params.topic) ? params.topic[0] : params.topic;

  const { assets, searchAssetResultTrigger, searchAssets } = useParamStore();

  return (
    <div className="w-[90%] m-auto pt-4">
      <div className="flex flex-col md:flex-row gap-4">
        <AssetSearchCard topicId={topicId} />
      </div>

      <div className="mt-5">
        {searchAssetResultTrigger && (
          <>
            <ShowAssets assets={searchAssets} />
          </>
        )}
        <ShowAssets assets={assets} />
      </div>

      <div className="h-[15vh]"></div>
    </div>
  );
}
