'use client';

import { useMutation } from '@tanstack/react-query';

import { postContact } from '@/api/contactApi';

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
    onError: () => {
      toast({
        title: 'Unable to send message',
        description:
          'Error while sending message! Please try again later or contact developer',
        variant: 'destructive',
      });
    },
  });

  return mutation;
}
