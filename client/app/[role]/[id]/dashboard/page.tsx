'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

import ShowTopics from '@/components/ShowTopics';
import SearchCard from '@/components/SearchCard';
import AddTopicDialog from '@/components/AddTopicDialog';
import AddTopicButton from '@/components/AddTopicButton';

import { useGetStaffDetails } from '@/hooks/userHooks';

import { useParamStore } from '@/stores/paramStore';
import { useRoleIdStore } from '@/stores/roleIdStore';
import { useStaffStore } from '@/stores/usersStore/staffStore';
import { useStudentStore } from '@/stores/usersStore/studentStore';

export default function Page() {
  const params = useParams();
  const router = useRouter();

  const role = Array.isArray(params.role) ? params.role[0] : params.role;
  const userId = Array.isArray(params.id) ? params.id[0] : params.id;

  const { setRole, setId } = useRoleIdStore();

  const { topics, searchResultTrigger, searchTopics } = useParamStore();

  // Set student details in the store
  const { setRegNo } = useStudentStore();
  useEffect(() => {
    if (role === 'student') {
      const regNo = userId;
      setRegNo(regNo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role, userId]);

  // Set staff details in the store
  const mutation = useGetStaffDetails();
  const { setStaffName, setDesignation, setPhoto } = useStaffStore();

  useEffect(() => {
    if (role === 'staff') {
      mutation.mutate(userId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  useEffect(() => {
    if (role === 'staff' && mutation.isSuccess) {
      const data = mutation.data?.data;
      if (data) {
        setStaffName(data.staffname);
        setDesignation(data.designation);
        setPhoto(data.photourl);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutation.isSuccess]);

  useEffect(() => {
    setId(userId);
    setRole(role);

    if (!(role === 'staff' || role === 'student')) {
      setId('');
      setRole('');
      router.push('/auth/signin');
    }
  }, [role, router, setId, setRole, userId]);

  const [dialogTrigger, setDialogTrigger] = useState(false);

  return (
    <div className="w-[90%] m-auto pt-4">
      <AddTopicDialog
        dialogTrigger={dialogTrigger}
        setDialogTrigger={setDialogTrigger}
      />

      <div className="flex flex-col md:flex-row gap-4">
        {role === 'staff' && (
          <div className="flex flex-col justify-between gap-3 md:gap-6 h-full min-w-fit">
            <AddTopicButton setDialogTrigger={setDialogTrigger} />
          </div>
        )}
        <SearchCard
          role={role}
          userId={userId}
          dialogTrigger={dialogTrigger}
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
