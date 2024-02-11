/* eslint-disable react/no-unescaped-entities */
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@nextui-org/react";

import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { staffType } from "@/types/usersTypes/staffType";
import { useLoginMutation } from "@/hooks/auth/loginHook";
import { studentType } from "@/types/usersTypes/studentType";
import { useStaffStore } from "@/stores/usersStore/staffStore";
import { useStudentStore } from "@/stores/usersStore/studentStore";

const staffFormSchema = z.object({
  staffID: z
    .string()
    .max(10, { message: "Staff ID must be less than 10 characters" })
    .min(1, { message: "Staff ID must be more than 1 character" }),
  password: z
    .string()
    .min(4, { message: "Password must be more than 4 characters" }),
});

const studentFormSchema = z.object({
  regNo: z
    .string()
    .min(1, {
      message: "Bro Enter Something",
    })
    .refine((value) => /^\d+$/.test(value), {
      message: "Dont you see it is a field for Numbers",
      params: { regex: "/^\\d+$/" },
    })
    .refine((value) => /^7321/.test(value), {
      message:
        "Where are you studying? if Nandha College of Technology, then Register Number should start with 7321",
      params: { regex: "/^7321/" },
    })
    .refine((value) => /^\d{12}$/.test(value), {
      message:
        "Which year you are studying? the Register Number is 12 digits long",
      params: { regex: "/^\\d{12}$/" },
    }),
});

export function Login() {
  const { regNo, setRegNo } = useStudentStore();
  const { staffID, password, setStaffID, setPassword } = useStaffStore();

  const { toast } = useToast();

  const router = useRouter();

  const mutation = useLoginMutation();

  const handleLogin = () => {
    if (staffID && password) {
      const staff: staffType = {
        staffID,
        password,
      };
      mutation.mutate(staff);
    } else if (regNo) {
      const student: studentType = {
        regNo,
      };
      mutation.mutate(student);
    }
    password && setPassword("");
  };

  useEffect(() => {
    if (mutation.isSuccess) {
      if (regNo) {
        router.push(`/student/${regNo}/dashboard`);
      } else if (staffID) {
        router.push(`/staff/${staffID}/dashboard`);
      }
      toast({
        title: "Logged in",
        description: "Logged in successfully!!",
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
    <div className="flex h-screen w-full flex-col justify-center items-center pb-5 pt-[13vh] mt-[-8rem]">
      <Card className="w-[90vw] max-w-[400px]">
        <CardHeader>
          <CardTitle>Noter</CardTitle>
          <CardDescription>
            Notes and resource sharing made easy.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col space-y-4">
          <Form {...studentForm}>
            <form onSubmit={studentForm.handleSubmit(handleLogin)}>
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
              <Button
                type="submit"
                className="mt-3 w-full"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? (
                  <>
                    <Spinner color="white" size="sm" className="pr-2" />
                    Logging In
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </form>
          </Form>

          <div className="flex items-center space-x-2">
            <Separator className="w-[45%]" />
            <span className="text-xs text-muted-foreground">OR</span>
            <Separator className="w-[45%]" />
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full">
                Staff SignIn
              </Button>
            </DialogTrigger>

            <DialogContent className="w-[90vw] max-w-[400px]">
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
                            placeholder="b/nts/00"
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
                  <Button
                    type="submit"
                    className="mt-3 w-full"
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending ? (
                      <>
                        <Spinner color="white" size="sm" className="pr-2" />
                        Logging In
                      </>
                    ) : (
                      "Login"
                    )}
                  </Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      <div className="fixed bottom-5">
        <p className="text-sm text-muted-foreground">
          Crafted by{" "}
          <a
            href="https://github.com/GoAmeer030"
            target="__blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4 text-primary"
          >
            GoAmeer030
          </a>
          . The source code is on{" "}
          <a
            href="https://github.com/GoAmeer030/Noter"
            target="__blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4 text-primary"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </div>
  );
}
