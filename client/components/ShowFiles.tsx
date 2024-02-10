"use client";

import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
} from "@nextui-org/react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import Image from "next/image";
import React from "react";

import { saveAs } from "file-saver";

import { fileType } from "@/types/fileType";
import { useDeleteFileMutation } from "@/hooks/fileHooks";

export default function App({
    role,
    lable,
    files,
    setFiles,
}: {
    role: string;
    lable: string;
    files: fileType[];
    setFiles: React.Dispatch<React.SetStateAction<fileType[]>>;
}) {
    const mutation = useDeleteFileMutation();

    const keysToShow = [
        "S.NO",
        "FILENAME",
        "SYLLABUS",
        "DEPARTMENT",
        "YEAR",
        "SEMESTER",
        "SUBJECTCODE",
        "ACTIONS",
    ];

    const classNames = React.useMemo(
        () => ({
            th: ["bg-primary", "text-white", "text-center"],
            td: ["text-center"],
        }),
        []
    );

    const getDepartmentName = (id: string) => {
        const departementMap: { [key: string]: string } = {
            '1': "CSE",
            '2': "IT",
            '3': "ECE",
            '4': "EEE",
        };

        return departementMap[id] || "Unknown";
    }

    const getYearRoman = (id: string) => {
        const departementMap: { [key: string]: string } = {
            '1': "I",
            '2': "II",
            '3': "III",
            '4': "IV",
        };

        return departementMap[id] || "Unknown";
    };

    return (
        <>
            <h1 className="flex justify-center mt-6 mb-6">{lable}</h1>
            <div className="flex justify-center pt-2">
                <ScrollArea className="w-11/12">
                    <Table
                        removeWrapper
                        isCompact
                        classNames={classNames}
                        aria-label="Files files table"
                    >
                        <TableHeader>
                            {keysToShow.map((key, index) => (
                                <TableColumn key={index} align="center">
                                    {key}
                                </TableColumn>
                            ))}
                        </TableHeader>
                        <TableBody emptyContent={"No rows to display."}>
                            {files.map((file, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{file.filename}</TableCell>
                                    <TableCell>{file.syllabus}</TableCell>
                                    <TableCell>
                                        {getDepartmentName(file.department)}
                                    </TableCell>
                                    <TableCell>
                                        {getYearRoman(file.year)}
                                    </TableCell>
                                    <TableCell>{file.semester}</TableCell>
                                    <TableCell>{file.subjectcode}</TableCell>
                                    <TableCell>
                                        <div className="flex justify-around">
                                            <button
                                                onClick={() =>
                                                    window.open(
                                                        `${process.env.NEXT_PUBLIC_SERVER_URL}/${file.fileurl}`,
                                                        "_blank"
                                                    )
                                                }
                                            >
                                                <Image
                                                    src="/ViewIcon.svg"
                                                    alt="View"
                                                    width={20}
                                                    height={20}
                                                />
                                            </button>
                                            <button
                                                onClick={async () => {
                                                    const fileUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/${file.fileurl}`;
                                                    const response =
                                                        await fetch(fileUrl);
                                                    const blob =
                                                        await response.blob();
                                                    const fileUrlList =
                                                        file.fileurl.split("/");
                                                    const fileName =
                                                        fileUrlList[
                                                            fileUrlList.length -
                                                                1
                                                        ]
                                                            .split(".")
                                                            .pop();
                                                    saveAs(
                                                        blob,
                                                        file.filename +
                                                            "." +
                                                            fileName
                                                    );
                                                }}
                                            >
                                                <Image
                                                    src="/DownloadIcon.svg"
                                                    alt="Download"
                                                    width={20}
                                                    height={20}
                                                />
                                            </button>
                                            {role === "owner" && (
                                                <button
                                                    onClick={() => {
                                                        const fileId = file.id;
                                                        const newFiles =
                                                            files.filter(
                                                                (file) =>
                                                                    file.id !==
                                                                    fileId
                                                            );
                                                        mutation.mutate(
                                                            fileId,
                                                            {
                                                                onSuccess:
                                                                    () => {
                                                                        setFiles(
                                                                            newFiles
                                                                        );
                                                                    },
                                                            }
                                                        );
                                                    }}
                                                >
                                                    <Image
                                                        src="/DeleteIcon.svg"
                                                        alt="Delete"
                                                        width={20}
                                                        height={20}
                                                    />
                                                </button>
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>
        </>
    );
}
