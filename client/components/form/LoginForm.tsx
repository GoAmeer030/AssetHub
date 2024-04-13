'use client';

import { staffFormSchema } from '@/lib/validations/StaffLoginFormSchema';
import { studentFormSchema } from '@/lib/validations/StudentLoginFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import ButtonWithSpinner from '@/components/updatedui/ButtonWithSpinner';

import { useLoginMutation } from '@/hooks/auth/loginHook';

import { useStaffStore } from '@/stores/usersStore/staffStore';
import { useStudentStore } from '@/stores/usersStore/studentStore';

import { staffType } from '@/types/usersTypes/staffType';
import { studentType } from '@/types/usersTypes/studentType';

export default function LoginForm() {
  const { regNo, setRegNo } = useStudentStore();
  const {
    staffID,
    password,
    staffName,
    designation,
    photo,
    setStaffID,
    setPassword,
  } = useStaffStore();

  const router = useRouter();
  const { toast } = useToast();
  const mutation = useLoginMutation();

  const handleLogin = () => {
    if (staffID && password) {
      const staff: staffType = {
        staffID,
        password,
        staffName,
        designation,
        photo,
      };
      mutation.mutate(staff);
    } else if (regNo) {
      const student: studentType = {
        regNo,
      };
      mutation.mutate(student);
    }
    password && setPassword('');
  };

  useEffect(() => {
    if (mutation.isSuccess) {
      if (regNo) {
        router.push(`/student/${regNo}/dashboard`);
      } else if (staffID) {
        router.push(`/staff/${staffID}/dashboard`);
      }
      toast({
        title: 'Logged in',
        description: 'Logged in successfully!!',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutation.isSuccess]);

  const staffForm = useForm({
    resolver: zodResolver(staffFormSchema),
    defaultValues: {
      staffID,
      password,
    },
  });

  const studentForm = useForm({
    resolver: zodResolver(studentFormSchema),
    defaultValues: {
      regNo,
    },
  });

  return (
    <CardContent className="flex flex-col space-y-4">
      <Form {...studentForm}>
        <form
          onSubmit={studentForm.handleSubmit(handleLogin)}
          className="flex flex-col gap-3"
        >
          <FormField
            control={studentForm.control}
            name="regNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="ml-1">Register Number</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="732121104037"
                    onChange={(e) => {
                      setRegNo(e.target.value);
                      field.onChange(e.target.value);
                    }}
                  />
                </FormControl>
                <FormMessage className="ml-1" />
              </FormItem>
            )}
          />
          <ButtonWithSpinner
            mutation={mutation}
            innerContent="Login"
            innerContentOnLoading="Logging In"
            props={{
              type: 'submit',
              className: 'mt-3 w-full',
            }}
          />
        </form>
      </Form>

      <div className="flex items-center space-x-2">
        <Separator className="w-[45%]" />
        <span className="text-[0.6rem] text-muted-foreground">OR</span>
        <Separator className="w-[45%]" />
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full">
            Staff SignIn
          </Button>
        </DialogTrigger>

        <DialogContent className="w-[90vw] max-w-[360px]">
          <DialogHeader className="pb-2">
            <DialogTitle>Sign in as Staff</DialogTitle>
          </DialogHeader>

          <Form {...staffForm}>
            <form
              onSubmit={staffForm.handleSubmit(handleLogin)}
              className="flex flex-col gap-3"
            >
              <FormField
                control={staffForm.control}
                name="staffID"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Staff ID"
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
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Password"
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
              <ButtonWithSpinner
                mutation={mutation}
                innerContent="Login"
                innerContentOnLoading="Logging In"
                props={{
                  type: 'submit',
                  className: 'mt-3 w-full',
                }}
              />
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </CardContent>
  );
}
