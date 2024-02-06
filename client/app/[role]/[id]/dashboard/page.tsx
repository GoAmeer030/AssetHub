"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useGetFilesMutation } from "@/hooks/fileHooks";
import { useFileStore } from "@/stores/fileStore";

import SearchCard from "@/components/SearchCard";
import ShowFiles from "@/components/ShowFiles";
import FileUploadDialog from "@/components/FileUploadDialog";

import { fileType } from "@/types/fileType";

export default function Page() {
    const params = useParams();
    const router = useRouter();

    const mutation = useGetFilesMutation();

    const {
        id,
        filename,
        batch,
        department,
        year,
        semester,
        subjectcode,
        file,
        fileurl
    } = useFileStore();

    const role = Array.isArray(params.role) ? params.role[0] : params.role;

    role === "staff" || role === "student" ? null : router.push("/auth/signin");

    const [files, setFiles] = useState<fileType[]>([]);
    const [dialogTrigger, setDialogTrigger] = useState(false);

    useEffect(() => {
        if (dialogTrigger == false) {
            const data: fileType = {
                id,
                filename,
                batch,
                department,
                year,
                semester,
                subjectcode,
                file,
                fileurl,
            };
            mutation.mutate(data, {
                onSuccess: (data) => {
                    setFiles(data?.data?.file);
                },
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dialogTrigger]);
    
    return (
        <>
            <FileUploadDialog
                dialogTrigger={dialogTrigger}
                setDialogTrigger={setDialogTrigger}
            />
            <SearchCard
                role={role}
                setFiles={setFiles}
                setDialogTrigger={setDialogTrigger}
            />
            <ShowFiles role={role} files={files} setFiles={setFiles} />
        </>
    );
}
