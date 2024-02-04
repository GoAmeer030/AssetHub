"use client";

import {
    useQuery,
    useMutation
} from "@tanstack/react-query";

import { postUploadFile, getFiles } from "@/api/fileApi";

export function useUploadFileMutation() {
    const mutation = useMutation({
        mutationFn: postUploadFile,
        onSuccess: () => {
            console.log("file uploaded");
        },
        onError: () => {
            console.log("error");
        }
    })

    return mutation;
}

export function useGetFilesMutation() {
    const mutation = useMutation({
        mutationFn: getFiles,
        gcTime: 0,
        onSuccess: (data) => {
            console.log("success");
            console.log(data.data.file);
        },
        onError: () => {
            console.log("error");
        }
    })

    return mutation;
}