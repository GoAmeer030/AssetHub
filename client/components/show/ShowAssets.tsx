'use client';

import { DownloadIcon } from '@radix-ui/react-icons';
import { useEffect, useMemo, useState } from 'react';

import {
  Card,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';

import { DeleteIcon } from '@/components/icons/DeleteIcon';
import { ViewIcon } from '@/components/icons/ViewIcon';
import { useToast } from '@/components/ui/use-toast';
import ButtonWithSpinner from '@/components/updatedui/ButtonWithSpinner';

import { useDeleteAssetMutation } from '@/hooks/assetHook';

import { useParamStore } from '@/stores/paramStore';
import { useUserRoleIdStore } from '@/stores/usersStore/userRoleIdStore';

import { assetType } from '@/types/assetType';

export default function ShowAssets({
  lable,
  assets,
}: {
  lable: string;
  assets: assetType[];
}) {
  const mutation = useDeleteAssetMutation();

  const { toast } = useToast();

  const { setAssets } = useParamStore();

  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const pages = Math.ceil(assets?.length / rowsPerPage);
  const sortedAssets = useMemo(() => {
    return assets
      ? [...assets].sort((a, b) => a.assettype.localeCompare(b.assettype))
      : [];
  }, [assets]);
  const pageAssets = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return sortedAssets ? sortedAssets.slice(start, end) : [];
  }, [page, sortedAssets]);
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

  const handleViewClick = (url: string | null) => {
    if (typeof url === 'string') {
      const hasHttpOrHttps = url.startsWith('http') || url.startsWith('https');
      const finalUrl = hasHttpOrHttps
        ? url
        : `${process.env.NEXT_PUBLIC_SERVER_URL}/${url}`;
      window.open(finalUrl, '_blank');
    }
  };

  const handleDownloadClick = async (url: string | null) => {
    if (typeof url === 'string') {
      const hasHttpOrHttps = url.startsWith('http') || url.startsWith('https');
      if (!hasHttpOrHttps) {
        const finalUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/${url}`;
        const response = await fetch(finalUrl);
        const blob = await response.blob();
        const fileUrlList = finalUrl.split('/');
        const fileName = fileUrlList[fileUrlList.length - 1];
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  };

  const handleDeleteClick = (id: string) => {
    mutation.mutate(id);
  };

  useEffect(() => {
    if (mutation.isSuccess) {
      toast({
        title: 'Asset Deleted',
        description: 'Asset has been deleted successfully',
      });
      const newAssets = assets.filter(
        (asset) => asset.id != mutation.data?.data.id,
      );
      setAssets(newAssets);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutation.isSuccess]);

  const { role } = useUserRoleIdStore();

  return (
    <>
      {pageAssets.length > 0 ? (
        <Table
          removeWrapper
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
              <TableRow key={index}>
                <TableCell>
                  <p className="text-foreground/50">{index + 1}</p>
                </TableCell>
                <TableCell>{asset.assetname}</TableCell>
                <TableCell>
                  <p className="text-foreground/50">
                    {getAssetType(asset.assettype)}
                  </p>
                </TableCell>
                <TableCell className="justify-between">
                  <ButtonWithSpinner
                    innerContent={<ViewIcon />}
                    props={{
                      onClick: () => handleViewClick(asset.asseturl),
                      variant: 'ghost',
                      size: 'icon',
                    }}
                  />
                  {!(
                    asset.asseturl?.startsWith('http') ||
                    asset.asseturl?.startsWith('https')
                  ) && (
                    <ButtonWithSpinner
                      innerContent={<DownloadIcon />}
                      props={{
                        onClick: () => handleDownloadClick(asset.asseturl),
                        variant: 'ghost',
                        size: 'icon',
                      }}
                    />
                  )}
                  {role === 'staff' && (
                    <ButtonWithSpinner
                      innerContent={<DeleteIcon />}
                      props={{
                        onClick: () => handleDeleteClick(asset.id),
                        variant: 'ghost',
                        size: 'icon',
                      }}
                    />
                  )}
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
