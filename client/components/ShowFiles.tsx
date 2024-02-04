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

import React, { useEffect } from "react";

import { fileType } from "@/types/fileType";

export default function App({ files }: { files: fileType[] }) {
    const keysToShow = [
        "S.NO",
        "FILENAME",
        "BATCH",
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

    return (
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
                                <TableCell>{file.batch}</TableCell>
                                <TableCell>{file.department}</TableCell>
                                <TableCell>{file.year}</TableCell>
                                <TableCell>{file.semester}</TableCell>
                                <TableCell>{file.subjectcode}</TableCell>
                                <TableCell>
                                    <div className="flex justify-around">
                                        <Image
                                            src="/ViewIcon.svg"
                                            alt="View"
                                            width={20}
                                            height={20}
                                        />
                                        <Image
                                            src="/DownloadIcon.svg"
                                            alt="Download"
                                            width={20}
                                            height={20}
                                        />
                                        <Image
                                            src="/DeleteIcon.svg"
                                            alt="Delete"
                                            width={20}
                                            height={20}
                                        />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
    );
}
