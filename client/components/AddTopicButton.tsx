'use client';

import { useTheme } from 'next-themes';
import { PlusIcon } from '@radix-ui/react-icons';

import { Button } from './ui/button';
import { SparklesCore } from './ui/sparkles';
import { Card, CardContent } from './ui/card';

export default function AddTopicButton({
  setDialogTrigger,
}: {
  setDialogTrigger: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { theme } = useTheme();

  return (
    <Card
      className="relative h-[5.3rem]  min-w-fit cursor-pointer z-30"
      onClick={() => {
        setDialogTrigger(true);
      }}
    >
      <SparklesCore
        id="tsparticlesfullpage"
        background="transparent"
        minSize={0.6}
        maxSize={1.4}
        particleDensity={100}
        className="absolute h-[100%] w-[100%] z-0"
        particleColor={theme === 'dark' ? '#ffffff' : '#000000'}
      />
      <CardContent className="mt-5 mb-[-2] flex gap-5 items-center z-10">
        <Button
          className="z-20"
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
