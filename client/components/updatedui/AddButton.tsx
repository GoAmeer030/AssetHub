'use client';

import { PlusIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';

import { useParamStore } from '@/stores/paramStore';

import { Card } from '../ui/card';
import { SparklesCore } from '../ui/sparkles';

export default function AddButton() {
  const { theme } = useTheme();
  const { setAddTopicDialogTrigger, setAddAssetDialogTrigger, page } =
    useParamStore();

  return (
    <Card
      className="relative h-[2.3rem] max-w-fit cursor-pointer z-30 flex items-center justify-center rounded-md"
      onClick={() => {
        if (page === 'topic') {
          setAddTopicDialogTrigger(true);
        } else {
          setAddAssetDialogTrigger(true);
        }
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
      <div className="flex gap-2 items-center z-10 ml-2 mr-2 sm:mr-3">
        <span className="text-lg">
          <PlusIcon />
        </span>

        <div className="hidden sm:flex flex-col h-full justify-center">
          <p className="font-semibold">
            {page === 'topic' ? 'Add Topic' : 'Add Asset'}
          </p>
        </div>
      </div>
    </Card>
  );
}
