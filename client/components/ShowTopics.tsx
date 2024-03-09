'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';

import { topicType } from '@/types/topicType';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Card,
} from '@nextui-org/react';

export default function ShowTopics({
  lable,
  topics,
}: {
  lable: string;
  topics: topicType[];
}) {
  const router = useRouter();

  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const pages = Math.ceil(topics?.length / rowsPerPage);
  const pageTopics = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return topics ? topics.slice(start, end) : [];
  }, [page, topics]);
  const keysToShow = ['S.no', 'Topic', 'Handled To', 'Sub Syllabus'];

  const classNames = useMemo(
    () => ({
      wrapper: ['bg-transparent', 'border-0'],
      th: ['bg-transparent'],
    }),
    [],
  );

  // Helper functions to retrieve the department name and year in roman
  const getDepartmentName = (id: string) => {
    const departementMap: { [key: string]: string } = {
      '1': 'CSE',
      '2': 'IT',
      '3': 'ECE',
      '4': 'EEE',
    };

    return departementMap[id] || 'Unknown';
  };
  const getYearRoman = (id: string) => {
    const departementMap: { [key: string]: string } = {
      '1': 'I',
      '2': 'II',
      '3': 'III',
      '4': 'IV',
    };

    return departementMap[id] || 'Unknown';
  };

  // Top and bottom content for the table
  const topContent = () => {
    return <h1 className="ml-1 mt-3 mb-2 font-bold">{lable}</h1>;
  };
  const bottomContent = () => {
    return (
      <div className="w-full flex justify-center mt-5 scale-75">
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
      {pageTopics.length > 0 ? (
        <Table
          removeWrapper
          selectionMode="single"
          isHeaderSticky={true}
          classNames={classNames}
          aria-label="Topic topics table"
          topContent={topContent()}
          bottomContent={bottomContent()}
          className="mb-5"
        >
          <TableHeader>
            {keysToShow.map((key, index) => (
              <TableColumn key={index}>{key}</TableColumn>
            ))}
          </TableHeader>
          <TableBody emptyContent={'No files to display.'}>
            {pageTopics.map((topic, index) => (
              <TableRow
                key={index}
                className="cursor-pointer"
                onClick={() => {
                  router.push(`dashboard/${topic.id}`);
                }}
              >
                <TableCell>
                  <p className="text-foreground/50">{index + 1}</p>
                </TableCell>
                <TableCell>{topic.topicname}</TableCell>
                <TableCell>
                  <p className="text-foreground/50">
                    {getYearRoman(topic.year)}{' '}
                    {getDepartmentName(topic.department)} - {topic.semester} sem
                  </p>
                </TableCell>
                <TableCell>
                  {topic.subjectcode}{' '}
                  <p className="text-foreground/50 inline-block">
                    - {topic.syllabus}
                  </p>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Card
          isPressable
          className="h-[30vh] w-full flex flex-col gap-1 justify-center items-center bg-transparent"
        >
          <p className="font-bold text-2xl">Your Topics will appear here</p>
          <p className="font-lighter text-sm">No topics have been added yet.</p>
        </Card>
      )}
    </>
  );
}
