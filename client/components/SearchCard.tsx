"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@nextui-org/react";

import Image from "next/image";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { useGetFilesMutation } from "@/hooks/fileHooks";
import { useAccessTokenStore } from "@/stores/tokenStore/accessTokenStore";
import { useStaffStore } from "@/stores/usersStore/staffStore";
import { useStudentStore } from "@/stores/usersStore/studentStore";
import { useFileStore } from "@/stores/fileStore";
import { fileType } from "@/types/fileType";

export default function SearchCard({
    role,
    userId,
    setFiles,
    searchResultTrigger,
    setSearchResultTrigger,
    setSearchFiles,
    setDialogTrigger,
}: {
    role: string;
    userId: string;
    setFiles: React.Dispatch<React.SetStateAction<fileType[]>>;
    searchResultTrigger: boolean;
    setSearchResultTrigger: React.Dispatch<React.SetStateAction<boolean>>;
    setSearchFiles: React.Dispatch<React.SetStateAction<fileType[]>>;
    setDialogTrigger: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const router = useRouter();

    const {
        id: fileid,
        filename,
        syllabus,
        department,
        year,
        semester,
        subjectcode,
        file,
        fileurl,

        setId: setFileId,
        setFileName,
        setSyllabus,
        setDepartment,
        setYear,
        setSemester,
        setSubjectCode,
        setFileUrl,

        resetFile,
    } = useFileStore();
    const { setAccessToken } = useAccessTokenStore();
    const { resetStaff } = useStaffStore();
    const { resetStudent } = useStudentStore();

    const mutation = useGetFilesMutation();

    const [loggingOut, setLoggingOut] = useState(false);

    const handleLogout = () => {
        console.log("logout");
        setAccessToken("");
        localStorage.removeItem("accessToken");

        resetFile();
        resetStaff();
        resetStudent();
        setSearchResultTrigger(false);
        setFiles([]);
        setSearchFiles([]);

        setLoggingOut(false);

        router.push("/auth/signin");
        return;
    };

    const handleSearch = () => {
        const data: fileType = {
            id: fileid,
            filename,
            syllabus,
            department,
            year,
            semester,
            subjectcode,
            file,
            fileurl,
        };

        const defaultData: fileType = {
            id: "",
            filename: "",
            syllabus: "",
            department: "",
            year: "",
            semester: "",
            subjectcode: "",
            file: null,
            fileurl: "",
        };

        const hasChanged = Object.keys(data).some(
            (key) => (data as any)[key] !== (defaultData as any)[key]
        );

        if (hasChanged) {
            mutation.mutate(data);
        }
    };

    useEffect(() => {
        if (mutation.isSuccess && !searchResultTrigger) {
            setFiles(mutation.data?.data?.file);
        }

        if (mutation.isSuccess && searchResultTrigger) {
            setSearchFiles(mutation.data?.data?.file);
        }
        resetFile();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mutation.isSuccess]);

    useEffect(() => {
        console.log(userId);
        if (userId.length != 12) {
            const data: any = {};
            data.staffId = Number(userId);
            mutation.mutate(data);
        } else {
            let num = Number("20" + userId.slice(4, 6));
            let num_copy = num;
            for (; num % 4 !== 1; num--);
            setSyllabus(num.toString());
            setYear((new Date().getFullYear() - num_copy).toString());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    useEffect(() => {
        console.log(syllabus, year);
        handleSearch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [syllabus, year]);

    return (
        <div className="flex justify-center pt-20">
            <Card className="w-11/12">
                <CardHeader>
                    <div className="flex justify-between w-full">
                        <CardTitle className="pt-3">Welcome!</CardTitle>

                        {role === "staff" ? (
                            <div>
                                <Button
                                    className="mr-4"
                                    onClick={() => {
                                        setDialogTrigger(true);
                                    }}
                                >
                                    <Image
                                        src="/UploadIcon.svg"
                                        alt="Search"
                                        width={20}
                                        height={20}
                                        className="mr-2"
                                    />
                                    Upload
                                </Button>
                                <Button
                                    onClick={() => {
                                        handleLogout();
                                        setLoggingOut(true);
                                    }}
                                    disabled={loggingOut}
                                >
                                    {loggingOut ? (
                                        <>
                                            <Spinner
                                                color="white"
                                                size="sm"
                                                className="pr-2"
                                            />
                                            Logging Out
                                        </>
                                    ) : (
                                        <>
                                            <Image
                                                src="/LogoutIcon.svg"
                                                alt="Search"
                                                width={20}
                                                height={20}
                                                className="mr-2"
                                            />
                                            Logout
                                        </>
                                    )}
                                </Button>
                            </div>
                        ) : (
                            <Button
                                onClick={() => {
                                    handleLogout();
                                    setLoggingOut(true);
                                }}
                                disabled={loggingOut}
                            >
                                {loggingOut ? (
                                    <>
                                        <Spinner
                                            color="white"
                                            size="sm"
                                            className="pr-2"
                                        />
                                        Logging Out
                                    </>
                                ) : (
                                    <>
                                        <Image
                                            src="/LogoutIcon.svg"
                                            alt="Search"
                                            width={20}
                                            height={20}
                                            className="mr-2"
                                        />
                                        Logout
                                    </>
                                )}
                            </Button>
                        )}
                    </div>
                </CardHeader>
                <CardContent className="flex">
                    <>
                        <div className="md:w-11/12 lg:w-11/12 mr-5">
                            <Input
                                placeholder="File Name"
                                onChange={(e) => {
                                    setFileName(e.target.value);
                                }}
                            />
                        </div>
                        <div className="md:w-1/12 lg:w-1/12 flex justify-center">
                            <Button
                                disabled={mutation.isPending}
                                onClick={() => {
                                    setSearchResultTrigger(true);
                                    handleSearch();
                                }}
                            >
                                {mutation.isPending ? (
                                    <>
                                        <Spinner
                                            color="white"
                                            size="sm"
                                            className="pr-2"
                                        />
                                        Searching
                                    </>
                                ) : (
                                    <>
                                        <Image
                                            src="/SearchIcon.svg"
                                            alt="Search"
                                            width={20}
                                            height={20}
                                            className="mr-2"
                                        />
                                        Search
                                    </>
                                )}
                            </Button>
                        </div>
                    </>
                </CardContent>
                <CardFooter className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3 justify-between">
                    <Input
                        type="number"
                        placeholder="Syllabus"
                        onChange={(e) => {
                            setSyllabus(e.target.value);
                        }}
                    />
                    <Select
                        onValueChange={(val) => {
                            setDepartment(val);
                        }}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Department" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1">CSE</SelectItem>
                            <SelectItem value="2">IT</SelectItem>
                            <SelectItem value="3">ECE</SelectItem>
                            <SelectItem value="4">EEE</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select
                        onValueChange={(val) => {
                            setYear(val);
                        }}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Year" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1">I</SelectItem>
                            <SelectItem value="2">II</SelectItem>
                            <SelectItem value="3">III</SelectItem>
                            <SelectItem value="4">IV</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select
                        onValueChange={(val) => {
                            setSemester(val);
                        }}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Semester" />
                        </SelectTrigger>
                        <SelectContent>
                            {(year && (
                                <>
                                    <SelectItem
                                        value={String(Number(year) * 2 - 1)}
                                    >
                                        {Number(year) * 2 - 1}
                                    </SelectItem>
                                    <SelectItem
                                        value={String(Number(year) * 2)}
                                    >
                                        {Number(year) * 2}
                                    </SelectItem>
                                </>
                            )) || (
                                <>
                                    <SelectItem value="1">I</SelectItem>
                                    <SelectItem value="2">II</SelectItem>
                                    <SelectItem value="3">III</SelectItem>
                                    <SelectItem value="4">IV</SelectItem>
                                    <SelectItem value="5">V</SelectItem>
                                    <SelectItem value="6">VI</SelectItem>
                                    <SelectItem value="7">VII</SelectItem>
                                    <SelectItem value="8">VIII</SelectItem>
                                </>
                            )}
                        </SelectContent>
                    </Select>
                    <Input
                        placeholder="Subject Code"
                        onChange={(e) => {
                            setSubjectCode(e.target.value);
                        }}
                    />
                </CardFooter>
            </Card>
        </div>
    );
}
