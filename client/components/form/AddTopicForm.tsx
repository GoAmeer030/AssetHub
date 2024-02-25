'use client';

import { z } from 'zod';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import ButtonWithSpinner from '@/components/updatedui/ButtonWithSpinner';

import { topicType } from '@/types/topicType';
import { useTopicStore } from '@/stores/topicStore';
import { useUploadTopicMutation } from '@/hooks/topicHooks';
import { addTopicFormSchema } from '@/lib/validations/AddTopicFormSchema';

export default function AddTopicForm({
  setDialogTrigger,
}: {
  setDialogTrigger: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const {
    id,
    topicname,
    topicdesc,
    syllabus,
    year,
    department,
    semester,
    subjectcode,

    setTopicName,
    setSyllabus,
    setYear,
    setDepartment,
    setSemester,
    setSubjectCode,

    resetTopic,
  } = useTopicStore();

  const { toast } = useToast();
  const mutation = useUploadTopicMutation();

  const form = useForm<z.infer<typeof addTopicFormSchema>>({
    resolver: zodResolver(addTopicFormSchema),
    defaultValues: {
      syllabus: syllabus || '',
      year: year || '',
      department: department || '',
      semester: semester || '',
      subjectcode: subjectcode || '',
      topicname: topicname || '',
    },
  });

  const handleSave = (data: z.infer<typeof addTopicFormSchema>) => {
    const uploadFile: topicType = {
      id,
      topicname,
      topicdesc,
      syllabus,
      year,
      department,
      semester,
      subjectcode,
    };

    mutation.mutate(uploadFile);
  };

  useEffect(() => {
    if (mutation.isSuccess) {
      setDialogTrigger(false);
      resetTopic();
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
          name="department"
          render={({ field }: { field: any }) => (
            <FormItem>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  setDepartment(value);
                }}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1">CSE</SelectItem>
                  <SelectItem value="2">IT</SelectItem>
                  <SelectItem value="3">ECE</SelectItem>
                  <SelectItem value="4">EEE</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="ml-1" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="year"
          render={({ field }: { field: any }) => (
            <FormItem>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  setYear(value);
                }}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1">I</SelectItem>
                  <SelectItem value="2">II</SelectItem>
                  <SelectItem value="3">III</SelectItem>
                  <SelectItem value="4">IV</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="ml-1" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="semester"
          render={({ field }: { field: any }) => (
            <FormItem>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  setSemester(value);
                }}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Semester" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {year && (
                    <>
                      <SelectItem value={String(Number(year) * 2 - 1)}>
                        {Number(year) * 2 - 1}
                      </SelectItem>
                      <SelectItem value={String(Number(year) * 2)}>
                        {Number(year) * 2}
                      </SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
              <FormMessage className="ml-1" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="syllabus"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between gap-3 ml-1">
              <FormLabel className="min-w-fit mt-2">Syllabus</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="2021"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    setSyllabus(e.target.value);
                  }}
                  className="w-[30ch]"
                />
              </FormControl>
              <FormMessage className="ml-1" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subjectcode"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between gap-3 ml-1">
              <FormLabel className="min-w-fit mt-2">Subject Code</FormLabel>
              <FormControl>
                <Input
                  placeholder="CC1234"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    setSubjectCode(e.target.value);
                  }}
                  className="w-[30ch]"
                />
              </FormControl>
              <FormMessage className="ml-1" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="topicname"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between gap-3 ml-1">
              <FormLabel className="min-w-fit mt-2">Topic Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Newtons Laws"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    setTopicName(e.target.value);
                  }}
                  className="w-[30ch]"
                />
              </FormControl>
              <FormMessage className="ml-1" />
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
