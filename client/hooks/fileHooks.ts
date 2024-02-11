"use client";

import { toast, useToast } from "@/components/ui/use-toast";

import {
    useMutation
} from "@tanstack/react-query";

import { postUploadFile, getFiles, deleteFile } from "@/api/fileApi";

export function useUploadFileMutation() {
    const { toast } = useToast();
    const mutation = useMutation({
        mutationFn: postUploadFile,
        onSuccess: () => {
            // console.log("file uploaded");
        },
        onError: () => {
            // console.log("error");
            toast({
                title: "Something went wrong",
                description: "Error while uploading file!! Please try again later or contact developer",
                variant: "destructive"
            })
        }
    })

    return mutation;
}

export function useGetFilesMutation() {
    const mutation = useMutation({
        mutationFn: getFiles,
        gcTime: 0,
        retry: false,
        onSuccess: (data) => {
            // console.log("success");
            // console.log(data.data.file);
        },
        onError: () => {
            // console.log("error");
            toast({
                title: "Something went wrong",
                description: "Error while fetching files!! Please try again later or contact developer",
                variant: "destructive"
            })
        }
    })

    return mutation;
}

export function useDeleteFileMutation() {
    const mutation = useMutation({
        mutationFn: deleteFile,
        onSuccess: () => {
            // console.log("file deleted");
        },
        onError: () => {
            // console.log("error");
        }
    })

    return mutation;
}