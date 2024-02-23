import { useMutation } from '@tanstack/react-query';

import { useToast } from '@/components/ui/use-toast';

import { postStaffRegister } from '@/api/auth/staffRegister';

export function useStaffRegisterMutation() {
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: postStaffRegister,
    onSuccess: (data) => {
      // console.log(data);
      toast({
        title: 'Staff Registered',
        description:
          'Staff Registered successfully!! Now you can login with your credentials.',
      });
    },
    onError: () => {
      // console.log("error");
      toast({
        title: 'Something went wrong',
        description:
          'Error while logging in!! Please try again later or contact developer',
        variant: 'destructive',
      });
    },
  });

  return mutation;
}
