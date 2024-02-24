'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/components/ui/input';
import { CardContent } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import ButtonWithSpinner from '@/components/updatedui/ButtonWithSpinner';

import { staffType } from '@/types/usersTypes/staffType';
import { useStaffStore } from '@/stores/usersStore/staffStore';
import { useStaffRegisterMutation } from '@/hooks/auth/staffRegisterHook';
import { staffRegisterFormSchema } from '@/lib/validations/RegisterStaffSchema';

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
        <form onSubmit={staffForm.handleSubmit(handleRegister)}>
          <FormField
            control={staffForm.control}
            name="staffID"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="staffID" className="ml-1">
                  Staff ID
                </FormLabel>
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
                  />
                </FormControl>
                <FormMessage className="ml-1" />
              </FormItem>
            )}
          />
          <FormField
            control={staffForm.control}
            name="staffName"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="staffName" className="ml-1">
                  Staff Name
                </FormLabel>
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
                  />
                </FormControl>
                <FormMessage className="ml-1" />
              </FormItem>
            )}
          />
          <FormField
            control={staffForm.control}
            name="designation"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="designation" className="ml-1">
                  Designation
                </FormLabel>
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
                  />
                </FormControl>
                <FormMessage className="ml-1" />
              </FormItem>
            )}
          />
          <FormField
            control={staffForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="ml-1">Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="••••••••"
                    type="password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                      field.onChange(e.target.value);
                    }}
                  />
                </FormControl>
                <FormMessage className="ml-1" />
              </FormItem>
            )}
          />
          <FormField
            control={staffForm.control}
            name="photo"
            render={({ field: { onChange, onBlur, name } }) => (
              <FormItem>
                <FormLabel>Upload</FormLabel>
                <FormControl>
                  <Input
                    id="photo"
                    type="file"
                    accept=".png, .jpg, .jpeg, .gif"
                    onChange={(e) => {
                      const photo = e.target.files?.[0];
                      if (photo) {
                        setPhoto(photo);
                      }
                      onChange(photo);
                    }}
                    onBlur={onBlur}
                    name={name}
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
