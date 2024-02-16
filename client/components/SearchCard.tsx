'use client';

import { useEffect } from 'react';
import { PlusIcon } from '@radix-ui/react-icons';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import ButtonWithSpinner from '@/components/updatedui/ButtonWithSpinner';
import { SearchIcon } from '@/components/icons/SearchIcon';

import { topicType } from '@/types/topicType';
import { useTopicStore } from '@/stores/topicStore';
import { useParamStore } from '@/stores/paramStore';
import { useGetTopicsMutation } from '@/hooks/topicHooks';

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
    id,
    topicname,
    topicdisc,
    syllabus,
    department,
    year,
    semester,
    subjectcode,

    setTopicName,
    setTopicDisc,
    setSyllabus,
    setDepartment,
    setYear,
    setSemester,
    setSubjectCode,

    resetTopic,
  } = useTopicStore();

  const setTopics = useParamStore((state) => state.setTopics);
  const searchResultTrigger = useParamStore(
    (state) => state.searchResultTrigger,
  );
  const setSearchResultTrigger = useParamStore(
    (state) => state.setSearchResultTrigger,
  );
  const setSearchTopics = useParamStore((state) => state.setSearchTopics);
  const mutation = useGetTopicsMutation();
  const { toast } = useToast();

  const handleSearch = () => {
    const data: topicType = {
      id,
      topicname,
      topicdisc,
      syllabus,
      department,
      year,
      semester,
      subjectcode,
    };

    const defaultData: topicType = {
      id: '',
      topicname: '',
      topicdisc: '',
      syllabus: '',
      department: '',
      year: '',
      semester: '',
      subjectcode: '',
    };

    const hasChanged = Object.keys(data).some(
      (key) => (data as any)[key] !== (defaultData as any)[key],
    );

    if (hasChanged) {
      mutation.mutate(data);
    }
  };

  useEffect(() => {
    if (mutation.isSuccess && !searchResultTrigger) {
      setTopics(mutation.data?.data?.topic);
    }

    if (mutation.isSuccess && searchResultTrigger) {
      setSearchTopics(mutation.data?.data?.topic);

      toast({
        title: 'Search Result',
        description: `${mutation.data?.data?.topic.length} topics found`,
      });
    }
    resetTopic();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutation.isSuccess]);

  useEffect(() => {
    // console.log(userId);
    if (userId.length != 12) {
      const data: any = {};
      data.staffId = Number(userId);
      mutation.mutate(data);
    } else {
      let num = Number('20' + userId.slice(4, 6));
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
      {role === 'staff' && (
        <Card>
          <CardContent className="mt-6 flex gap-5 items-center">
            <Button
              className=""
              onClick={() => {
                setDialogTrigger(true);
              }}
            >
              <span className="text-lg mr-2">
                <PlusIcon />
              </span>
              Add Topic
            </Button>

            <div className="flex flex-col h-full justify-center">
              <p className="font-bold">Add Topic</p>
              <p className="text-small text-gray-400">
                Add topics to be accessed by students
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader className="font-bold">Search files</CardHeader>
        <CardContent className="flex">
          <>
            <div className="md:w-10/12 lg:w-10/12 mr-5">
              <Input
                placeholder="Topic Name"
                onChange={(e) => {
                  setTopicName(e.target.value);
                }}
              />
            </div>
            <div className="md:w-2/12 lg:w-2/12 flex justify-center">
              <ButtonWithSpinner
                mutation={mutation}
                innerContent={
                  <>
                    <span className="mr-2">
                      <SearchIcon />
                    </span>
                    Search
                  </>
                }
                innerContentOnLoading={'Searching'}
                props={{
                  className: 'w-full',
                  onClick: () => {
                    setSearchResultTrigger(true);
                    handleSearch();
                  },
                }}
              />
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
