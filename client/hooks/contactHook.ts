'use client';

import { postContact } from '@/api/contactApi';
import { useMutation } from '@tanstack/react-query';

import { useToast } from '@/components/ui/use-toast';

export function useContactMutation() {
  const { toast } = useToast();
  const mutation = useMutation({
    mutationFn: postContact,
    retry: false,
    onSuccess: () => {
      toast({
        title: 'Message sent',
        description: 'Thank you for contacting us!',
      });
    },
    onError: (error) => {
      toast({
        title: 'Unable to send message',
        description:
          error.message ||
          'Error while sending message! Please try again later or contact developer',
        variant: 'destructive',
      });
    },
  });

  return mutation;
}
