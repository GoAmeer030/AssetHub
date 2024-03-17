'use client';

import { staffRegisterFormSchema } from '@/lib/validations/RegisterStaffSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { CardContent } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import ButtonWithSpinner from '@/components/updatedui/ButtonWithSpinner';

import { useStaffRegisterMutation } from '@/hooks/auth/staffRegisterHook';

import { useStaffStore } from '@/stores/usersStore/staffStore';

import { staffType } from '@/types/usersTypes/staffType';

export default function StaffRegisterForm() {
  const {
    staffID,
    password,
    staffName,
    designation,
    photo,
    setStaffID,
    setPassword,
    setStaffName,
    setDesignation,
    setPhoto,
    resetStaff,
  } = useStaffStore();

  const router = useRouter();

  const mutation = useStaffRegisterMutation();

  const staffForm = useForm<staffType>({
    resolver: zodResolver(staffRegisterFormSchema),
    defaultValues: {
      staffID,
      password,
      staffName,
      designation,
    },
  });

  const handleRegister = () => {
    let photoFile: File | null = null;

    if (typeof photo === 'string') {
      photoFile = null;
    } else if (photo instanceof File) {
      photoFile = photo;
    }

    const staffData: staffType = {
      staffID,
      password,
      staffName,
      designation,
      photo: photoFile,
    };

    mutation.mutate(staffData);
  };

  useEffect(() => {
    if (mutation.isSuccess) {
      resetStaff();
      router.push('/auth/signin');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutation.isSuccess]);

  return (
    <CardContent>
      <Form {...staffForm}>
        <form
          onSubmit={staffForm.handleSubmit(handleRegister)}
          className="flex flex-col gap-3"
        >
          <FormField
            control={staffForm.control}
            name="staffID"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between gap-3">
                <FormLabel htmlFor="staffID" className="min-w-fit mt-2">
                  Staff ID
                </FormLabel>
                <div className="min-w-fit flex flex-col gap-2">
                  <FormControl>
                    <Input
                      {...field}
                      id="staffID"
                      type="text"
                      placeholder="a/bc/123"
                      onChange={(e) => {
                        setStaffID(e.target.value);
                        field.onChange(e.target.value);
                      }}
                      className="w-[27ch]"
                    />
                  </FormControl>
                  <FormMessage className="ml-1" />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={staffForm.control}
            name="staffName"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between gap-3">
                <FormLabel htmlFor="staffName" className="min-w-fit mt-2">
                  Staff Name
                </FormLabel>
                <div className="min-w-fit flex flex-col gap-2">
                  <FormControl>
                    <Input
                      {...field}
                      id="staffName"
                      type="text"
                      placeholder="Guido Van Rossum"
                      onChange={(e) => {
                        setStaffName(e.target.value);
                        field.onChange(e.target.value);
                      }}
                      className="w-[27ch]"
                    />
                  </FormControl>
                  <FormMessage className="ml-1" />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={staffForm.control}
            name="designation"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between gap-3">
                <FormLabel htmlFor="designation" className="min-w-fit mt-2">
                  Designation
                </FormLabel>
                <div className="min-w-fit flex flex-col gap-2">
                  <FormControl>
                    <Input
                      {...field}
                      id="designation"
                      type="text"
                      placeholder="Professor"
                      onChange={(e) => {
                        setDesignation(e.target.value);
                        field.onChange(e.target.value);
                      }}
                      className="w-[27ch]"
                    />
                  </FormControl>
                  <FormMessage className="ml-1" />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={staffForm.control}
            name="password"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between gap-3">
                <FormLabel className="min-w-fit mt-2">Password</FormLabel>
                <div className="min-w-fit flex flex-col gap-2">
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="••••••••"
                      type="password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                        field.onChange(e.target.value);
                      }}
                      className="w-[27ch]"
                    />
                  </FormControl>
                  <FormMessage className="ml-1 max-w-[24ch]" />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={staffForm.control}
            name="photo"
            render={({ field: { onChange, onBlur, name } }) => (
              <FormItem className="flex items-center justify-between gap-3">
                <FormLabel className="min-w-fit mt-2">
                  Display Picture
                </FormLabel>
                <FormControl>
                  <Input
                    id="photo"
                    type="file"
                    accept=".png, .jpg, .jpeg, .gif, .webp"
                    onChange={(e) => {
                      const photo = e.target.files?.[0];
                      if (photo) {
                        setPhoto(photo);
                      }
                      onChange(photo);
                    }}
                    onBlur={onBlur}
                    name={name}
                    className="text-sm file:h-full
                                 file:mr-5 file:py-0 file:px-0
                                 hover:file:cursor-pointer w-[27ch]"
                  />
                </FormControl>
                <FormMessage className="ml-1" />
              </FormItem>
            )}
          />
          <ButtonWithSpinner
            mutation={mutation}
            innerContent="Register"
            innerContentOnLoading="Registering"
            props={{
              type: 'submit',
              className: 'mt-3 w-full',
            }}
          />
        </form>
      </Form>
    </CardContent>
  );
}
