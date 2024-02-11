/* eslint-disable react/no-unescaped-entities */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { useToast } from "@/components/ui/use-toast";
import { Spinner } from "@nextui-org/react";

import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useStaffStore } from "@/stores/usersStore/staffStore";
import { useStudentStore } from "@/stores/usersStore/studentStore";
import { staffType } from "@/types/usersTypes/staffType";
import { studentType } from "@/types/usersTypes/studentType";
import { useLoginMutation } from "@/hooks/auth/loginHook";

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
    const { staffID, password, setStaffID, setPassword } = useStaffStore();
    const { regNo, setRegNo } = useStudentStore();

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
        <div className="w-11/12 lg:w-[500px] md:w-[500px]">
            <h1 className="text-center text-xl p-4 text-bold">I AM A</h1>
            <Tabs defaultValue="2">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="1">Staff</TabsTrigger>
                    <TabsTrigger value="2">Student</TabsTrigger>
                </TabsList>
                <TabsContent value="1">
                    <Card>
                        <CardHeader>
                            <CardTitle>Staff Login</CardTitle>
                            <CardDescription>
                                Enter Staff Unique ID and Password
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Form {...staffForm}>
                                <form
                                    onSubmit={staffForm.handleSubmit(
                                        handleLogin
                                    )}
                                >
                                    <FormField
                                        control={staffForm.control}
                                        name="staffID"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Staff ID</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="nts/1/1"
                                                        onChange={(e) => {
                                                            setStaffID(
                                                                e.target.value
                                                            );
                                                            field.onChange(
                                                                e.target.value
                                                            );
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={staffForm.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="••••••••"
                                                        type="password"
                                                        onChange={(e) => {
                                                            setPassword(
                                                                e.target.value
                                                            );
                                                            field.onChange(
                                                                e.target.value
                                                            );
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button
                                        type="submit"
                                        className="mt-6"
                                        disabled={mutation.isPending}
                                    >
                                        {mutation.isPending ? (
                                            <>
                                                <Spinner
                                                    color="white"
                                                    size="sm"
                                                    className="pr-2"
                                                />
                                                Logging In
                                            </>
                                        ) : (
                                            "Login"
                                        )}
                                    </Button>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Student login</CardTitle>
                            <CardDescription>
                                Enter your Register Number
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Form {...studentForm}>
                                <form
                                    onSubmit={studentForm.handleSubmit(
                                        handleLogin
                                    )}
                                >
                                    <FormField
                                        control={studentForm.control}
                                        name="regNo"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Register Number
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="732121104037"
                                                        onChange={(e) => {
                                                            setRegNo(
                                                                e.target.value
                                                            );
                                                            field.onChange(
                                                                e.target.value
                                                            );
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button
                                        type="submit"
                                        className="mt-6"
                                        disabled={mutation.isPending}
                                    >
                                        {mutation.isPending ? (
                                            <>
                                                <Spinner
                                                    color="white"
                                                    size="sm"
                                                    className="pr-2"
                                                />
                                                Logging In
                                            </>
                                        ) : (
                                            "Login"
                                        )}
                                    </Button>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
