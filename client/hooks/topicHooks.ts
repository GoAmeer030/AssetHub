'use client';

import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';

import { toast, useToast } from '@/components/ui/use-toast';

import { deleteTopic, getTopics, postAddTopic } from '@/api/topicApi';

export function useAddTopicMutation() {
  const { toast } = useToast();
  const mutation = useMutation({
    mutationFn: postAddTopic,
    onSuccess: () => {},
    onError: (error) => {
      toast({
        title: 'Unable to create topic',
        description:
          error.message ||
          'Error while creating topic! Please try again later or contact developer',
        variant: 'destructive',
      });
    },
  });

  return mutation;
}

export function useGetTopicsMutation() {
  const mutation = useMutation({
    mutationFn: getTopics,
    gcTime: 0,
    retry: false,
    onError: (error) => {
      toast({
        title: 'Something went wrong',
        description:
          error.message ||
          'Error while fetching topics!! Please try again later or contact developer',
        variant: 'destructive',
      });
    },
  });

  return mutation;
}

export function useDeleteTopicMutation() {
  const { toast } = useToast();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: deleteTopic,
    onSuccess: () => {
      router.push('/auth/signin');
    },
    onError: (error) => {
      toast({
        title: 'Unable to delete topic',
        description:
          error.message ||
          'Error while deleting topic!! Please try again later or contact developer',
        variant: 'destructive',
      });
    },
  });

  return mutation;
}
