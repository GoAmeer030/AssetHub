'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useAccessTokenStore } from '@/stores/tokenStore/accessTokenStore';
import { useVerifyTokenMutation } from '@/hooks/auth/verifyTokenHook';
import { useStaffStore } from '@/stores/usersStore/staffStore';
import { useStudentStore } from '@/stores/usersStore/studentStore';

export default function Page() {
  const router = useRouter();
  const mutation = useVerifyTokenMutation();
  const { accessToken } = useAccessTokenStore();

  useEffect(() => {
    if (accessToken) {
      mutation.mutate(accessToken);
    } else {
      router.push('/auth/signin');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  useEffect(() => {
    if (mutation.isSuccess) {
      const role = mutation.data?.data?.role;
      if (role === 1 && useStaffStore.getState().staffID) {
        router.push(`/staff/${useStaffStore.getState().staffID}/dashboard`);
      } else if (role === 0 && useStudentStore.getState().regNo) {
        router.push(`/student/${useStudentStore.getState().regNo}/dashboard`);
      } else {
        router.push('/auth/signin');
      }
    } else if (mutation.isError) {
      router.push('/auth/signin');
    }
  }, [mutation.isSuccess, mutation.isError, mutation.data, router]);

  return <main></main>;
}
