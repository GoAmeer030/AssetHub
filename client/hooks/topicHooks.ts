'use client';

import { useMutation, useQuery } from '@tanstack/react-query';

import { postUploadTopic, getTopics, deleteTopic } from '@/api/topicApi';

import { toast, useToast } from '@/components/ui/use-toast';

export function useUploadTopicMutation() {
  const { toast } = useToast();
  const mutation = useMutation({
    mutationFn: postUploadTopic,
    onSuccess: () => {},
    onError: () => {
      toast({
        title: 'Unable to create topic',
        description:
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
    onSuccess: (data) => {
      // console.log("success");
      // console.log(data.data.file);
    },
    onError: () => {
      // console.log("error");
      toast({
        title: 'Something went wrong',
        description:
          'Error while fetching topics!! Please try again later or contact developer',
        variant: 'destructive',
      });
    },
  });

  return mutation;
}

export function useDeleteTopicMutation() {
  const mutation = useMutation({
    mutationFn: deleteTopic,
    onSuccess: () => {
      // console.log("file deleted");
    },
    onError: () => {
      // console.log("error");
    },
  });

  return mutation;
}
