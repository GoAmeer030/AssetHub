"use client";

import Image from "next/image";
import { useEffect } from "react";
import { Spinner } from "@nextui-org/react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { fileType } from "@/types/fileType";
import { useFileStore } from "@/stores/fileStore";
import { useParamStore } from "@/stores/paramStore";
import { useGetFilesMutation } from "@/hooks/fileHooks";

export default function SearchCard({
  role,
  userId,
  setDialogTrigger,
}: {
  role: string;
  userId: string;
  setDialogTrigger: React.Dispatch<React.SetStateAction<boolean>>;
}) {
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

    setFileName,
    setSyllabus,
    setDepartment,
    setYear,
    setSemester,
    setSubjectCode,

    resetFile,
  } = useFileStore();

  const setFiles = useParamStore((state) => state.setFiles);
  const searchResultTrigger = useParamStore(
    (state) => state.searchResultTrigger
  );
  const setSearchResultTrigger = useParamStore(
    (state) => state.setSearchResultTrigger
  );
  const setSearchFiles = useParamStore((state) => state.setSearchFiles);
  const mutation = useGetFilesMutation();
  const { toast } = useToast();

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

      toast({
        title: "Search Result",
        description: `${mutation.data?.data?.file.length} files found`,
      });
    }
    resetFile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutation.isSuccess]);

  useEffect(() => {
    // console.log(userId);
    if (userId.length != 12) {
      const data: any = {};
      data.staffId = Number(userId);
      mutation.mutate(data);
    } else {
      let num = Number("20" + userId.slice(4, 6));
      let num_copy = num;
      for (; num % 4 !== 1; num--);
      const localSyllabus = num.toString();
      const localYear = (new Date().getFullYear() - num_copy).toString();
      setSyllabus(localSyllabus);
      setYear(localYear);

      const data: any = {};
      data.syllabus = localSyllabus;
      data.year = localYear;
      mutation.mutate(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return (
    <div className="flex flex-col gap-4 items-center justify-center pt-24 w-full">
      {role === "staff" && (
        <Card className="w-11/12">
          <CardContent className="mt-6 flex gap-5 items-center">
            <Button
              className=""
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

            <div className="flex flex-col h-full justify-center">
              <p className="font-bold">Upload file</p>
              <p className="text-small text-gray-400">
                upload files to be accessed by students.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="w-11/12">
        <CardHeader className="font-bold">Search files</CardHeader>
        <CardContent className="flex">
          <>
            <div className="md:w-10/12 lg:w-10/12 mr-5">
              <Input
                placeholder="File Name"
                onChange={(e) => {
                  setFileName(e.target.value);
                }}
              />
            </div>
            <div className="md:w-2/12 lg:w-2/12 flex justify-center">
              <Button
                className="w-full"
                disabled={mutation.isPending}
                onClick={() => {
                  setSearchResultTrigger(true);
                  handleSearch();
                }}
              >
                {mutation.isPending ? (
                  <>
                    <Spinner color="white" size="sm" className="pr-2" />
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
                  <SelectItem value={String(Number(year) * 2 - 1)}>
                    {Number(year) * 2 - 1}
                  </SelectItem>
                  <SelectItem value={String(Number(year) * 2)}>
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
