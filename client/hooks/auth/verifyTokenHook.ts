import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';

import { useMutation } from '@tanstack/react-query';

import { useToast } from '@/components/ui/use-toast';

import { postVerifyToken } from '@/api/auth/verifyToken';

import { useAccessTokenStore } from '@/stores/tokenStore/accessTokenStore';
import { useStaffStore } from '@/stores/usersStore/staffStore';
import { useStudentStore } from '@/stores/usersStore/studentStore';
import { useUserRoleIdStore } from '@/stores/usersStore/userRoleIdStore';

export function useVerifyTokenMutation() {
  const { toast } = useToast();
  const { setPhoto, setStaffID, setStaffName, setDesignation } =
    useStaffStore();
  const { setRegNo } = useStudentStore();
  const { setId, setRole } = useUserRoleIdStore();

  const mutation = useMutation({
    mutationFn: postVerifyToken,
    onSuccess: (data) => {
      if (data) {
        console.log(data);
        if ('staffid' in data.data) {
          setStaffID(data.data.id);
          setStaffName(data.data.staffname);
          setDesignation(data.data.designation);
          setPhoto(data.data.photourl);
          setId(data.data.id);
          setRole('staff');
        } else {
          setRegNo(data.data.regNo);
          setId(data.data.regNo);
          setRole('student');
        }
      }
    },
    onError: (error) => {
      toast({
        title: 'Session Expired!!',
        description:
          error.message ||
          'Error while verifying token!! Please Login Again!! (or) Please try again later or contact developer',
        variant: 'destructive',
      });
    },
    retry: 0,
  });

  return mutation;
}

export function useVerifyToken(isRedirectToDashboard = false) {
  const router = useRouter();
  const mutation = useVerifyTokenMutation();
  const accessToken = useAccessTokenStore.getState().accessToken;

  useEffect(() => {
    if (accessToken) {
      mutation.mutate(accessToken);
    } else {
      router.push('/auth/signin');
      console.log('going to home page');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const success = useMemo(() => mutation.isSuccess, [mutation.isSuccess]);
  const error = useMemo(() => mutation.isError, [mutation.isError]);

  useEffect(() => {
    if (mutation.isSuccess && isRedirectToDashboard) {
      const role = useUserRoleIdStore.getState().role;
      if (role === 'staff') {
        router.push(`/staff/${useStaffStore.getState().staffID}/dashboard`);
      } else if (role === 'student') {
        router.push(`/student/${useStudentStore.getState().regNo}/dashboard`);
      } else {
        router.push('/auth/signin');
      }
    } else if (mutation.isError) {
      router.push('/auth/signin');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success, error]);
}
