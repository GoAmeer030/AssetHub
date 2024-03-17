'use client';

import { addAssetFormSchema } from '@/lib/validations/AddAssetFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import ButtonWithSpinner from '@/components/updatedui/ButtonWithSpinner';

import { useAddAssetMutation } from '@/hooks/assetHook';

import { useAssetStore } from '@/stores/assetStore';
import { useParamStore } from '@/stores/paramStore';

export default function AddAssetForm() {
  const {
    id: assetid,
    assetname,
    assettype,
    asseturl,
    file,

    setAssetName,
    setAssetType,
    setAssetUrl,
    setFile,

    resetAsset,
  } = useAssetStore();
  const { setAddAssetDialogTrigger } = useParamStore();
  const params = useParams();

  const topicId = Array.isArray(params.topic) ? params.topic[0] : params.topic;

  const { toast } = useToast();
  const mutation = useAddAssetMutation();

  const [isUrlDisabled, setIsUrlDisabled] = useState(false);
  const [isFileDisabled, setIsFileDisabled] = useState(false);

  const form = useForm<z.infer<typeof addAssetFormSchema>>({
    resolver: zodResolver(addAssetFormSchema),
  });

  const handleSave = () => {
    mutation.mutate({
      uploadDetails: {
        id: assetid,
        assetname,
        assettype,
        asseturl,
        file,
      },
      topicid: topicId,
    });
  };

  useEffect(() => {
    if (mutation.isSuccess) {
      setAddAssetDialogTrigger(false);
      resetAsset();
      form.reset();

      toast({
        title: 'Topic added',
        description: 'added in the topics collection',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutation.isSuccess]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSave)}
        className="flex flex-col gap-3 mt-4"
      >
        <FormField
          control={form.control}
          name="assettype"
          render={({ field }: { field: any }) => (
            <FormItem>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  setAssetType(value);
                }}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Asset Type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1">Books</SelectItem>
                  <SelectItem value="2">Notes</SelectItem>
                  <SelectItem value="3">Question Bank or Paper</SelectItem>
                  <SelectItem value="4">Article</SelectItem>
                  <SelectItem value="5">Video</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="ml-1 text-[0.7rem]" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="assetname"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between gap-3 ml-1">
              <FormLabel className="min-w-fit mt-2">Asset Name</FormLabel>
              <div className="max-w-[60%] flex flex-col gap-2">
                <FormControl>
                  <Input
                    placeholder="Imp 2 Questions"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      setAssetName(e.target.value);
                    }}
                    className="max-w-[100%]"
                  />
                </FormControl>
                <FormMessage className="max-w-[100%] ml-1 text-[0.7rem]" />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="asseturl"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between gap-3 ml-1">
              <FormLabel className="min-w-fit mt-2">Asset Url</FormLabel>
              <div className="max-w-[60%] flex flex-col gap-2">
                <FormControl>
                  <Input
                    placeholder="https://github.com/GoAmeer030/AssetHub"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      setAssetUrl(e.target.value);
                      if (e.target.value) {
                        setIsFileDisabled(true);
                      } else {
                        setIsFileDisabled(false);
                      }
                    }}
                    disabled={isUrlDisabled}
                    className="max-w-[100%]"
                  />
                </FormControl>
                <FormMessage className="max-w-[100%] ml-1 text-[0.7rem]" />
              </div>
            </FormItem>
          )}
        />
        <div className="flex items-center space-x-2">
          <Separator className="w-[45%]" />
          <span className="text-xs text-muted-foreground">OR</span>
          <Separator className="w-[45%]" />
        </div>
        <FormField
          control={form.control}
          name="file"
          render={({ field: { onChange, onBlur, name } }) => (
            <FormItem className="flex items-center justify-between gap-3 ml-1">
              <FormLabel className="min-w-fit mt-2">File</FormLabel>
              <div className="max-w-[60%] flex flex-col gap-2">
                <FormControl>
                  <Input
                    id="file"
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setFile(file);
                        setIsUrlDisabled(true);
                      } else {
                        setIsUrlDisabled(false);
                      }
                      onChange(file);
                    }}
                    disabled={isFileDisabled}
                    className="max-w-[100%]"
                  />
                </FormControl>
                <FormMessage className="max-w-[100%] ml-1 text-[0.7rem]" />
              </div>
            </FormItem>
          )}
        />
        <ButtonWithSpinner
          mutation={mutation}
          innerContent={'Add'}
          innerContentOnLoading={'Adding'}
          props={{
            type: 'submit',
            className: 'mt-6',
          }}
        />
      </form>
    </Form>
  );
}
