"use client";

import Image from "next/image";
import { ThemeMenuButton } from "./ThemeMenuButton";

export default function Navbar() {
    return (
        <nav className="fixed top-0 mt-5 left-1/2 transform -translate-x-1/2 w-11/12 flex justify-between items-center bg-card py-2 px-6 rounded-lg shadow border border-primary">
            <div className="flex items-center">
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
