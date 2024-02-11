"use client";

import Image from "next/image";
import { ThemeMenuButton } from "./ThemeMenuButton";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full py-7 px-10 flex justify-between">
      <div className="flex">
        <Image
          src="/NotesIcon.svg"
          alt="Search"
          width={20}
          height={20}
          className="mr-2"
        />
        <p className="text-2xl font-bold">Noter</p>
      </div>

      <div>
        <ThemeMenuButton />
      </div>
    </nav>
  );
}
