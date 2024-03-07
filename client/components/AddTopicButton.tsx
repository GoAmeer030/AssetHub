'use client';

import { useTheme } from 'next-themes';
import { PlusIcon } from '@radix-ui/react-icons';

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
      className="relative h-[2.3rem] max-w-fit cursor-pointer z-30 flex items-center justify-center"
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
      <CardContent className="mt-[1.4rem] flex gap-2 items-center z-10">
        <span className="text-lg">
          <PlusIcon />
        </span>

        <div className="hidden sm:flex flex-col h-full justify-center">
          <p className="font-semibold">Add Topic</p>
        </div>
      </CardContent>
    </Card>
  );
}
