"use client";

import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <div className="fixed bottom-5">
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div>
          Mentored by
          <a
            href="https://www.linkedin.com/in/suresh-kumar-009431121/"
            target="__blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4 text-primary ml-1 mr-1"
          >
            Suresh Kumar V S








                </a>
        </div>
        <Separator orientation="vertical" />
        <div>
          Crafted by
          <a
            href="https://github.com/GoAmeer030"
            target="__blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4 text-primary ml-1 mr-1"
          >
            Mohamed Ameer Noufil N
          </a>
        </div>
        <Separator orientation="vertical" />
        <div>
          The source code is on
          <a
            href="https://github.com/GoAmeer030/Noter"
            target="__blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4 text-primary ml-1 mr-1"
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
