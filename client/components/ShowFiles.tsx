"use client";

import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Pagination,
    Tooltip,
} from "@nextui-org/react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";

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

    const { toast } = useToast();

    const [page, setPage] = React.useState(1);
    const rowsPerPage = 10;

    const pages = Math.ceil(files.length / rowsPerPage);

    const pageFiles = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return files.slice(start, end);
    }, [page, files]);

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
            wrapper: ["bg-background"],
            th: ["bg-primary", "text-white", "text-center"],
            td: ["text-center"],
        }),
        []
    );

    const getDepartmentName = (id: string) => {
        const departementMap: { [key: string]: string } = {
            "1": "CSE",
            "2": "IT",
            "3": "ECE",
            "4": "EEE",
        };

        return departementMap[id] || "Unknown";
    };

    const getYearRoman = (id: string) => {
        const departementMap: { [key: string]: string } = {
            "1": "I",
            "2": "II",
            "3": "III",
            "4": "IV",
        };

        return departementMap[id] || "Unknown";
    };

    const bottomContent = () => {
        return (
            <div className="w-full flex justify-center">
                <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={page}
                    total={pages}
                    onChange={(page) => setPage(page)}
                    defaultValue={1}
                />
            </div>
        );
    };

    return (
        <>
            <h1 className="flex justify-center mt-6 mb-6">{lable}</h1>
            <div className="flex justify-center pt-2">
                <ScrollArea className="w-11/12">
                    <Table
                        isHeaderSticky={true}
                        classNames={classNames}
                        aria-label="Files files table"
                        bottomContent={bottomContent()}
                    >
                        <TableHeader>
                            {keysToShow.map((key, index) => (
                                <TableColumn
                                    key={index}
                                    align="center"
                                    className={
                                        key === "S.NO" ||
                                        key === "DEPARTMENT" ||
                                        key === "SYLLABUS" ||
                                        key === "YEAR"
                                            ? "hidden md:table-cell"
                                            : ""
                                    }
                                >
                                    {key}
                                </TableColumn>
                            ))}
                        </TableHeader>
                        <TableBody emptyContent={"No files to display."}>
                            {pageFiles.map((file, index) => (
                                <TableRow key={index}>
                                    <TableCell className="hidden md:table-cell">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell>{file.filename}</TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        {file.syllabus}
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        {getDepartmentName(file.department)}
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        {getYearRoman(file.year)}
                                    </TableCell>
                                    <TableCell>{file.semester}</TableCell>
                                    <TableCell>{file.subjectcode}</TableCell>
                                    <TableCell>
                                        <div className="flex justify-between w-full">
                                            <Tooltip
                                                showArrow={true}
                                                content="View"
                                            >
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
                                            </Tooltip>
                                            <Tooltip
                                                showArrow={true}
                                                content="Download"
                                            >
                                                <button
                                                    onClick={async () => {
                                                        toast({
                                                            title: "Downloading",
                                                            description:
                                                                "Your file is downloading...",
                                                        });

                                                        const fileUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/${file.fileurl}`;
                                                        const response =
                                                            await fetch(
                                                                fileUrl
                                                            );
                                                        const blob =
                                                            await response.blob();
                                                        const fileUrlList =
                                                            file.fileurl.split(
                                                                "/"
                                                            );
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
                                            </Tooltip>
                                            <Tooltip
                                                showArrow={true}
                                                color={"danger"}
                                                content="Delete"
                                            >
                                                {role === "owner" && (
                                                    <button
                                                        onClick={() => {
                                                            const fileId =
                                                                file.id;
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
                                            </Tooltip>
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
