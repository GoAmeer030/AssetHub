'use client';

import { useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { useParamStore } from '@/stores/paramStore';
import { useGetTopicsMutation } from '@/hooks/topicHooks';

import ShowTopics from '@/components/ShowTopics';
import SearchCard from '@/components/SearchCard';
import ProfileCard from '@/components/ProfileCard';
import AddTopicDialog from '@/components/AddTopicDialog';
import AddTopicButton from '@/components/AddTopicButton';

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
    <div className="w-[90%] m-auto pt-4">
      <AddTopicDialog
        dialogTrigger={dialogTrigger}
        setDialogTrigger={setDialogTrigger}
      />

      <div className="flex flex-col md:flex-row gap-4">
        {role === 'staff' && (
          <div className="flex flex-col justify-between gap-4 md:gap-6 h-full min-w-fit">
            <ProfileCard userId={userId} />
            <AddTopicButton setDialogTrigger={setDialogTrigger} />
          </div>
        )}
        <SearchCard
          role={role}
          userId={userId}
          setDialogTrigger={setDialogTrigger}
        />
      </div>

      <div className="mt-5">
        {searchResultTrigger && (
          <>
            <ShowTopics
              role={'user'}
              lable={'Topics For Your Search'}
              topics={searchTopics}
            />
          </>
        )}
        <ShowTopics
          role={role === 'staff' ? 'owner' : 'user'}
          lable={role === 'staff' ? 'Topics added By You' : 'Topics For you'}
          topics={topics}
        />
      </div>

      <div className="h-[15vh]"></div>
    </div>
  );
}
