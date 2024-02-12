"use client";

// UI components
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

import { fileType } from "@/types/fileType";
import { Button } from "@/components/ui/button";
import { useParamStore } from "@/stores/paramStore";
import { useToast } from "@/components/ui/use-toast";

// Updated UI componenets
import ButtonWithSpinner from "@/components/updatedui/ButtonWithSpinner";

// React and NextJs stuff
import Image from "next/image";
import React from "react";

// Types Stores Hooks
import { fileType } from "@/types/fileType";
import { useDeleteFileMutation } from "@/hooks/fileHooks";

// Others
import { saveAs } from "file-saver";

export default function App({
  role,
  lable,
  files,
}: {
  role: string;
  lable: string;
  files: fileType[];
}) {
    const mutation = useDeleteFileMutation();

    const { toast } = useToast();

    const handleDeleteFile = (fileId: string) => {
        const newFiles = files.filter((file) => file.id !== fileId);
        mutation.mutate(fileId, {
            onSuccess: () => {
                setFiles(newFiles);
                toast({
                    title: "Deleted",
                    description: "File deleted successfully",
                });
            },
        });
    };

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
      <div className="flex justify-center">
        <ScrollArea className="w-11/12 border-0">
          <Table
            isHeaderSticky={true}
            classNames={classNames}
            aria-label="Files files table"
            topContent={
              <h1 className="flex justify-center mt-2 mb-2">{lable}</h1>
            }
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
                    <div>
                      <Tooltip showArrow={true} content="View">
                        <Button
                          variant={"ghost"}
                          size={"icon"}
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
                        </Button>
                      </Tooltip>
                      <Tooltip showArrow={true} content="Download">
                        <Button
                          variant={"ghost"}
                          size={"icon"}
                          onClick={async () => {
                            toast({
                              title: "Downloading",
                              description: "Your file is downloading...",
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
                                                </Button>
                                            </Tooltip>
                                            <Tooltip
                                                showArrow={true}
                                                color={"danger"}
                                                content="Delete"
                                            >
                                                {role === "owner" && (
                                                    <ButtonWithSpinner
                                                        mutation={mutation}
                                                        innerContent={
                                                            <Image
                                                                src="/DeleteIcon.svg"
                                                                alt="Delete"
                                                                width={20}
                                                                height={20}
                                                            />
                                                        }
                                                        innerContentOnLoading={
                                                            ""
                                                        }
                                                        props={{
                                                            variant: "ghost",
                                                            size: "icon",
                                                            onClick: () => {
                                                                handleDeleteFile(
                                                                    file.id
                                                                );
                                                            },
                                                        }}
                                                    />
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
