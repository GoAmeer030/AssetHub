'use client';

import { PlusIcon } from '@radix-ui/react-icons';

import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

export default function AddTopicButton({
  setDialogTrigger,
}: {
  setDialogTrigger: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Card className="h-[5.3rem]  min-w-fit">
      <CardContent className="mt-5 mb-[-2] flex gap-5 items-center">
        <Button
          onClick={() => {
            setDialogTrigger(true);
          }}
        >
          <span className="text-lg">
            <PlusIcon />
          </span>
        </Button>

        <div className="flex flex-col h-full justify-center">
          <p className="font-bold">Add Topic</p>
          <p className="text-small text-gray-400">Create new topic</p>
        </div>
      </CardContent>
    </Card>
  );
}
