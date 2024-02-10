"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Spinner } from "@nextui-org/react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useFileStore } from "@/stores/fileStore";
import { fileType } from "@/types/fileType";
import { useUploadFileMutation } from "@/hooks/fileHooks";
import React, { useEffect } from "react";

const formSchema = z.object({
    syllabus: z
        .string()
        .refine((value) => /^\d{4}$/.test(value), {
            message: "Syllabus should be a 4-digit number represting the year.",
            params: { regex: "/^\\d{4}$/" },
        })
        .refine((value) => parseInt(value) % 4 === 1, {
            message:
                "Syllabus regulation year you entered is not valid, Please refer online for the correct year.",
        }),
    department: z.string().min(1, { message: "Please select a department." }),
    year: z.string().min(1, { message: "Year is required" }),
    semester: z.string().min(1, { message: "Semester is required" }),
    subjectcode: z.string().length(6, {
        message: "Subject Code should be exactly 6 letters long",
    }),
    filename: z
        .string()
        .min(5, { message: "File Name should have at least 5 characters" })
        .max(30, { message: "File Name should have at most 30 characters" }),
    file: z
        .any()
        .refine((value) => value !== null, { message: "File is required" }),
});

export default function FileUploadDialog({
    dialogTrigger,
    setDialogTrigger,
}: {
    dialogTrigger: boolean;
    setDialogTrigger: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const {
        id: fileid,
        syllabus,
        year,
        department,
        semester,
        subjectcode,
        filename,
        file,
        fileurl,
        setId: setFileId,
        setSyllabus,
        setYear,
        setDepartment,
        setSemester,
        setSubjectCode,
        setFileName,
        setFile,
        resetFile,
    } = useFileStore();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            syllabus: syllabus || "",
            year: year || "",
            department: department || "",
            semester: semester || "",
            subjectcode: subjectcode || "",
            filename: filename || "",
            file: file || undefined,
        },
    });

    const mutation = useUploadFileMutation();

    const handleSave = (data: z.infer<typeof formSchema>) => {
        const uploadFile: fileType = {
            id: fileid,
            syllabus,
            year,
            department,
            semester,
            subjectcode,
            filename,
            file,
            fileurl,
        };

        mutation.mutate(uploadFile);
    };

    useEffect(() => {
        console.log(mutation.isSuccess);
        if (mutation.isSuccess) {
            setDialogTrigger(false);
            resetFile();
            form.reset();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mutation.isSuccess]);

    return (
        <Dialog
            open={dialogTrigger}
            onOpenChange={(open) => {
                setDialogTrigger(open);
            }}
        >
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Upload File</DialogTitle>
                    <DialogDescription>
                        Choose the File and update the details. Click save when
                        you&apos;re done.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSave)}>
                        <FormField
                            control={form.control}
                            name="syllabus"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Syllabus</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="2021"
                                            {...field}
                                            onChange={(e) => {
                                                field.onChange(e.target.value);
                                                setSyllabus(e.target.value);
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="department"
                            render={({ field }: { field: any }) => (
                                <FormItem>
                                    <FormLabel>Department</FormLabel>
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
                                            <SelectItem value="1">
                                                CSE
                                            </SelectItem>
                                            <SelectItem value="2">
                                                IT
                                            </SelectItem>
                                            <SelectItem value="3">
                                                ECE
                                            </SelectItem>
                                            <SelectItem value="4">
                                                EEE
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="year"
                            render={({ field }: { field: any }) => (
                                <FormItem>
                                    <FormLabel>Year</FormLabel>
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
                                            <SelectItem value="2">
                                                II
                                            </SelectItem>
                                            <SelectItem value="3">
                                                III
                                            </SelectItem>
                                            <SelectItem value="4">
                                                IV
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="semester"
                            render={({ field }: { field: any }) => (
                                <FormItem>
                                    <FormLabel>Semester</FormLabel>
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
                                                    <SelectItem
                                                        value={String(
                                                            Number(year) * 2 - 1
                                                        )}
                                                    >
                                                        {Number(year) * 2 - 1}
                                                    </SelectItem>
                                                    <SelectItem
                                                        value={String(
                                                            Number(year) * 2
                                                        )}
                                                    >
                                                        {Number(year) * 2}
                                                    </SelectItem>
                                                </>
                                            )}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="subjectcode"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Subject Code</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="CC1234"
                                            {...field}
                                            onChange={(e) => {
                                                field.onChange(e.target.value);
                                                setSubjectCode(e.target.value);
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="filename"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>File Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Unit 1 Imp Ques"
                                            {...field}
                                            onChange={(e) => {
                                                field.onChange(e.target.value);
                                                setFileName(e.target.value);
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="file"
                            render={({ field: { onChange, onBlur, name } }) => (
                                <FormItem>
                                    <FormLabel>Upload</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="file"
                                            type="file"
                                            accept=".pdf,.doc,.docx,.xlsx,.csv,.xls,.txt"
                                            onChange={(e) => {
                                                const file =
                                                    e.target.files?.[0];
                                                if (file) {
                                                    setFile(file);
                                                }
                                                onChange(file);
                                            }}
                                            onBlur={onBlur}
                                            name={name}
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
                                    Uploading
                                </>
                            ) : (
                                "Upload"
                            )}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
