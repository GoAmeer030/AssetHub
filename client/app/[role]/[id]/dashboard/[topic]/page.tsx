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
    <>
      <ShowAssets assets={assets} />
      <AssetSearchCard topicId={topicId} />
    </>
  );
}
