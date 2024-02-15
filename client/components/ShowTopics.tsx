"use client";

import React from "react";
import Image from "next/image";
import { saveAs } from "file-saver";

import { topicType } from "@/types/topicType";
import { Button } from "@/components/ui/button";
import { useParamStore } from "@/stores/paramStore";
import { useToast } from "@/components/ui/use-toast";
import { useDeleteTopicMutation } from "@/hooks/topicHooks";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
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

export default function ShowTopics({
  role,
  lable,
  topics,
}: {
  role: string;
  lable: string;
  topics: topicType[];
}) {
  const { toast } = useToast();

  const mutation = useDeleteTopicMutation();
  const setFiles = useParamStore((state) => state.setTopics);

  const [page, setPage] = React.useState(1);
  const rowsPerPage = 10;

  const pages = Math.ceil(topics.length / rowsPerPage);

  const pageTopics = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return topics.slice(start, end);
  }, [page, topics]);

  const keysToShow = [
    "S.NO",
    "TOPIC",
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
            aria-label="Topic topics table"
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
              {pageTopics.map((topic, index) => (
                <TableRow key={index}>
                  <TableCell className="hidden md:table-cell">
                    {index + 1}
                  </TableCell>
                  <TableCell>{topic.topicname}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {topic.syllabus}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {getDepartmentName(topic.department)}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {getYearRoman(topic.year)}
                  </TableCell>
                  <TableCell>{topic.semester}</TableCell>
                  <TableCell>{topic.subjectcode}</TableCell>
                  <TableCell>
                    <div>
                      {/* <Tooltip showArrow={true} content="View">
                        <Button
                          variant={"ghost"}
                          size={"icon"}
                          onClick={() =>
                            window.open(
                              `${process.env.NEXT_PUBLIC_SERVER_URL}/${topic.fileurl}`,
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

                            const fileUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/${topic.fileurl}`;
                            const response = await fetch(fileUrl);
                            const blob = await response.blob();
                            const fileUrlList = topic.fileurl.split("/");
                            const fileName = fileUrlList[fileUrlList.length - 1]
                              .split(".")
                              .pop();
                            saveAs(blob, topic.filename + "." + fileName);
                          }}
                        >
                          <Image
                            src="/DownloadIcon.svg"
                            alt="Download"
                            width={20}
                            height={20}
                          />
                        </Button>
                      </Tooltip> */}
                      <Tooltip
                        showArrow={true}
                        color={"danger"}
                        content="Delete"
                      >
                        {role === "owner" && (
                          <Button
                            variant={"ghost"}
                            size={"icon"}
                            onClick={() => {
                              const topicId = topic.id;
                              const newFiles = topics.filter(
                                (topic) => topic.id !== topicId
                              );
                              mutation.mutate(topicId, {
                                onSuccess: () => {
                                  setFiles(newFiles);
                                },
                              });
                            }}
                          >
                            <Image
                              src="/DeleteIcon.svg"
                              alt="Delete"
                              width={20}
                              height={20}
                            />
                          </Button>
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
