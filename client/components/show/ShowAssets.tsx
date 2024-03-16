'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';

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

import { assetType } from '@/types/assetType';

export default function ShowAssets({
  lable,
  assets,
}: {
  lable: string;
  assets: assetType[];
}) {
  const router = useRouter();

  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const pages = Math.ceil(assets?.length / rowsPerPage);
  const pageAssets = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return assets ? assets.slice(start, end) : [];
  }, [page, assets]);
  const keysToShow = ['S.no', 'Asset', 'Type', 'Actions'];

  const getAssetType = (id: string) => {
    const assetTypeMap: { [key: string]: string } = {
      '1': 'Book',
      '2': 'Notes',
      '3': 'Question Papers',
      '4': 'Article',
      '5': 'Video',
    };

    return assetTypeMap[id] || 'Unknown';
  };

  const classNames = useMemo(
    () => ({
      wrapper: ['bg-transparent', 'border-0'],
      th: ['bg-transparent', 'text-center'],
      td: ['bg-transparent', 'text-center'],
    }),
    [],
  );

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
      {pageAssets.length > 0 ? (
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
            {pageAssets.map((asset, index) => (
              <TableRow key={index} className="cursor-pointer">
                <TableCell>
                  <p className="text-foreground/50">{index + 1}</p>
                </TableCell>
                <TableCell>{asset.assetname}</TableCell>
                <TableCell>
                  <p className="text-foreground/50">
                    {getAssetType(asset.assettype)}
                  </p>
                </TableCell>
                <TableCell>
                  <p className="text-foreground/50">Actions</p>
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
          <p className="font-bold text-2xl">Your Assets will appear here</p>
          <p className="font-lighter text-sm">No Assets have been added yet.</p>
        </Card>
      )}
    </>
  );
}
