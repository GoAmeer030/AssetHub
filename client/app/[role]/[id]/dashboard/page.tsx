"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { useParamStore } from "@/stores/paramStore";
import { useGetFilesMutation } from "@/hooks/fileHooks";

import ShowFiles from "@/components/ShowFiles";
import SearchCard from "@/components/SearchCard";
import FileUploadDialog from "@/components/FileUploadDialog";

export default function Page() {
    const params = useParams();
    const router = useRouter();

    const mutation = useGetFilesMutation();

    const role = Array.isArray(params.role) ? params.role[0] : params.role;
    const userId = Array.isArray(params.id) ? params.id[0] : params.id;
    role === "staff" || role === "student" ? null : router.push("/auth/signin");

    const [dialogTrigger, setDialogTrigger] = useState(false);

    const files = useParamStore((state) => state.files);
    const setFiles = useParamStore((state) => state.setFiles);
    const searchFiles = useParamStore((state) => state.searchFiles);
    const searchResultTrigger = useParamStore((state) => state.searchResultTrigger);

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
                setDialogTrigger={setDialogTrigger}
            />
            {searchResultTrigger && (
                <>
                    <ShowFiles
                        role={"user"}
                        lable={"Files For Your Search"}
                        files={searchFiles}
                    />
                </>
            )}
            <ShowFiles
                role={role === "staff" ? "owner" : "user"}
                lable={
                    role === "staff" ? "Files Uploaded By You" : "Files For you"
                }
                files={files}
            />
        </>
    );
}
