'use client';

import { useEffect } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

import ButtonWithSpinner from '@/components/updatedui/ButtonWithSpinner';
import { SearchIcon } from '@/components/icons/SearchIcon';

import { useParamStore } from '@/stores/paramStore';
import { useAssetStore } from '@/stores/assetStore';
import { useGetAssetsMutation } from '@/hooks/assetHook';
import { set } from 'date-fns';

export default function AssetSearchCard({ topicId }: { topicId: string }) {
  const {
    setAssets,
    searchAssetResultTrigger,
    setSearchAssetResultTrigger,
    setSearchAssets,
  } = useParamStore();
  const {
    id,
    assetname,
    assettype,
    asseturl,
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
    };

    mutation.mutate(data);
  };

  useEffect(() => {
    mutation.mutate({ topicId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicId]);

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

  return (
    <div className="flex flex-col gap-4 items-center justify-center w-full z-20">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="font-bold">Search Assets</CardTitle>
          <CardDescription className="text-small text-gray-400">
            Get the assets you want!!
          </CardDescription>
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
              <SelectItem value="3">Question Bank or Paper</SelectItem>
              <SelectItem value="4">Artical</SelectItem>
              <SelectItem value="5">YouTube Video</SelectItem>
            </SelectContent>
          </Select>
        </CardFooter>
      </Card>
    </div>
  );
}
