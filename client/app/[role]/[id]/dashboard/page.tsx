'use client';

import { useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { useParamStore } from '@/stores/paramStore';
import { useGetTopicsMutation } from '@/hooks/topicHooks';

import ShowTopics from '@/components/ShowTopics';
import SearchCard from '@/components/SearchCard';
import TopicAddDialog from '@/components/TopicAddDialog';

export default function Page() {
  const params = useParams();
  const router = useRouter();

  const mutation = useGetTopicsMutation();

  const role = Array.isArray(params.role) ? params.role[0] : params.role;
  const userId = Array.isArray(params.id) ? params.id[0] : params.id;
  role === 'staff' || role === 'student' ? null : router.push('/auth/signin');

  const [dialogTrigger, setDialogTrigger] = useState(false);

  const topics = useParamStore((state) => state.topics);
  const setTopics = useParamStore((state) => state.setTopics);
  const searchTopics = useParamStore((state) => state.searchTopics);
  const searchResultTrigger = useParamStore(
    (state) => state.searchResultTrigger,
  );

  useMemo(() => {
    if (dialogTrigger == false && role === 'staff') {
      const data = {
        staffId: userId,
      };
      mutation.mutate(data, {
        onSuccess: (data) => {
          setTopics(data?.data?.file);
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialogTrigger]);

  return (
    <>
      <TopicAddDialog
        dialogTrigger={dialogTrigger}
        setDialogTrigger={setDialogTrigger}
      />
      <SearchCard
        role={role}
        userId={userId}
        setDialogTrigger={setDialogTrigger}
      />
      {searchResultTrigger && (
        <>
          <ShowTopics
            role={'user'}
            lable={'Files For Your Search'}
            topics={searchTopics}
          />
        </>
      )}
      <ShowTopics
        role={role === 'staff' ? 'owner' : 'user'}
        lable={role === 'staff' ? 'Files Uploaded By You' : 'Files For you'}
        topics={topics}
      />
    </>
  );
}
