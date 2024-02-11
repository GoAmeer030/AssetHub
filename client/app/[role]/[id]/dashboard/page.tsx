"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

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

    const role = Array.isArray(params.role) ? params.role[0] : params.role;

    const userId = Array.isArray(params.id) ? params.id[0] : params.id;

    role === "staff" || role === "student" ? null : router.push("/auth/signin");

    const [files, setFiles] = useState<fileType[]>([]);
    const [dialogTrigger, setDialogTrigger] = useState(false);

    const [searchResultTrigger, setSearchResultTrigger] = useState(false);
    const [searchFiles, setSearchFiles] = useState<fileType[]>([]);

    useMemo(() => {
        if (dialogTrigger == false && role === "staff") {
            const data = {
                staffId: userId,
            };
            // console.log("page");
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
                userId={userId}
                setFiles={setFiles}
                searchResultTrigger={searchResultTrigger}
                setSearchResultTrigger={setSearchResultTrigger}
                setSearchFiles={setSearchFiles}
                setDialogTrigger={setDialogTrigger}
            />
            {searchResultTrigger ? (
                <>
                    <ShowFiles
                        role={"user"}
                        lable={"Files For Your Search"}
                        files={searchFiles}
                        setFiles={setSearchFiles}
                    />
                </>
            ) : (
                <></>
            )}
            <ShowFiles
                role={role === "staff" ? "owner" : "user"}
                lable={
                    role === "staff" ? "Files Uploaded By You" : "Files For you"
                }
                files={files}
                setFiles={setFiles}
            />
        </>
    );
}
