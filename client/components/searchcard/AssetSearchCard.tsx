'use client';

import { useEffect } from 'react';

import { DeleteIcon } from '@/components/icons/DeleteIcon';
import { SearchIcon } from '@/components/icons/SearchIcon';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import ButtonWithSpinner from '@/components/updatedui/ButtonWithSpinner';

import { useGetAssetsMutation } from '@/hooks/assetHook';
import { useDeleteTopicMutation } from '@/hooks/topicHooks';

import { useAssetStore } from '@/stores/assetStore';
import { useParamStore } from '@/stores/paramStore';
import { useUserRoleIdStore } from '@/stores/usersStore/userRoleIdStore';

export default function AssetSearchCard({ topicId }: { topicId: string }) {
  const {
    assets,
    setAssets,
    searchAssetResultTrigger,
    setSearchAssetResultTrigger,
    setSearchAssets,
    addAssetDialogTrigger,
  } = useParamStore();
  const {
    id,
    assetname,
    assettype,
    asseturl,
    file,
    setId,
    setAssetName,
    setAssetType,
    resetAsset,
  } = useAssetStore();
  const { toast } = useToast();

  const mutation = useGetAssetsMutation();

  const handleSearch = () => {
    const data = {
      id,
      assetname,
      assettype,
      asseturl,
      file,
    };

    mutation.mutate(data);
  };

  useEffect(() => {
    mutation.mutate({ topicId });
    setSearchAssetResultTrigger(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicId, addAssetDialogTrigger]);

  useEffect(() => {
    if (mutation.isSuccess && !searchAssetResultTrigger) {
      setAssets(mutation.data?.data?.asset);
    }

    if (mutation.isSuccess && searchAssetResultTrigger) {
      setSearchAssets(mutation.data?.data?.asset);

      toast({
        title: 'Search Result',
        description: `${mutation.data?.data?.asset.length} assets found`,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutation.isSuccess]);

  const { role } = useUserRoleIdStore();
  const deleteMutation = useDeleteTopicMutation();

  const handleDelete = async (id: string) => {
    if (assets.length > 0) {
      toast({
        title: 'Deletion Failed',
        variant: 'destructive',
        description:
          'There are still assets in this topic. Please remove them before deleting the topic.',
      });
    } else {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center w-full z-20">
      <Card className="w-full">
        <CardHeader>
          <>
            <div className="flex justify-between items-center w-full">
              <div>
                <CardTitle className="font-bold">Search Assets</CardTitle>
                <CardDescription className="text-small text-gray-400">
                  Get the assets you want!!
                </CardDescription>
              </div>
              {role === 'staff' && (
                <div className="md:w-4/12 lg:w-2/12 flex">
                  <ButtonWithSpinner
                    mutation={deleteMutation}
                    innerContent={
                      <>
                        <span className="mr-2">
                          <DeleteIcon />
                        </span>
                        Delete
                      </>
                    }
                    props={{
                      className: 'w-full hover:bg-red-700',
                      onClick: () => {
                        handleDelete(topicId);
                      },
                    }}
                  />
                </div>
              )}
            </div>
          </>
        </CardHeader>
        <CardContent className="flex">
          <>
            <div className="md:w-8/12 lg:w-10/12 mr-5">
              <Input
                placeholder="Asset Name"
                onChange={(e) => {
                  setAssetName(e.target.value);
                }}
              />
            </div>
            <div className="md:w-4/12 lg:w-2/12 flex justify-center">
              <ButtonWithSpinner
                mutation={mutation}
                innerContent={
                  <>
                    <span className="mr-2">
                      <SearchIcon />
                    </span>
                    Search
                  </>
                }
                props={{
                  className: 'w-full',
                  onClick: () => {
                    setSearchAssetResultTrigger(true);
                    handleSearch();
                  },
                }}
              />
            </div>
          </>
        </CardContent>
        <CardFooter className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3 justify-between">
          <Select
            onValueChange={(val) => {
              setAssetType(val);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Asset Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Book</SelectItem>
              <SelectItem value="2">Notes</SelectItem>
              <SelectItem value="3">Question Papers</SelectItem>
              <SelectItem value="4">Artical</SelectItem>
              <SelectItem value="5">Video</SelectItem>
            </SelectContent>
          </Select>
        </CardFooter>
      </Card>
    </div>
  );
}
