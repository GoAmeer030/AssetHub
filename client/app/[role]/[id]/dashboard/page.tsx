'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

import ShowTopics from '@/components/ShowTopics';
import AddTopicDialog from '@/components/AddTopicDialog';
import TopicSearchCard from '@/components/TopicSearchCard';

import { useGetStaffDetails } from '@/hooks/userHooks';

import { useParamStore } from '@/stores/paramStore';
import { useUserRoleIdStore } from '@/stores/userRoleIdStore';
import { useStaffStore } from '@/stores/usersStore/staffStore';
import { useStudentStore } from '@/stores/usersStore/studentStore';

export default function Page() {
  const params = useParams();
  const router = useRouter();

  const role = Array.isArray(params.role) ? params.role[0] : params.role;
  const userId = Array.isArray(params.id) ? params.id[0] : params.id;

  const { setRole, setId } = useUserRoleIdStore();

  const { topics, searchTopicResultTrigger, searchTopics } = useParamStore();

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
      <AddTopicDialog />

      {/* <div className="flex flex-col md:flex-row gap-4">
        <TopicSearchCard userId={userId} dialogTrigger={dialogTrigger} />
      </div>

      <div className="mt-5">
        {searchTopicResultTrigger && (
          <>
            <ShowTopics
              lable={'Topics For Your Search'}
              topics={searchTopics}
            />
          </>
        )}
        <ShowTopics
          lable={role === 'staff' ? 'Topics added By You' : 'Topics For you'}
          topics={topics}
        />
      </div> */}

      <div className="h-[15vh]"></div>
    </div>
  );
}
