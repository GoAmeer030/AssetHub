'use client';

import { Separator } from '@/components/ui/separator';

export default function Footer() {
  return (
    <div className="fixed bottom-5 w-[90%] m-auto flex items-center justify-center">
      <div className="flex h-5 items-center space-x-4 text-[0.6rem] sm:text-sm">
        <div className="w-fit">
          Mentored by <br className="sm:hidden" />
          <a
            href="https://www.linkedin.com/in/suresh-kumar-009431121/"
            target="__blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4 text-primary"
          >
            Suresh Kumar V S
          </a>
        </div>
        <Separator orientation="vertical" />
        <div>
          Crafted by <br className="sm:hidden" />
          <a
            href="https://github.com/GoAmeer030"
            target="__blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4 text-primary"
          >
            Mohamed Ameer Noufil N
          </a>
        </div>
        <Separator orientation="vertical" />
        <div>
          Source code is on <br className="sm:hidden" />
          <a
            href="https://github.com/GoAmeer030/Noter"
            target="__blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4 text-primary"
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
