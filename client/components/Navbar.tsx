"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

import { ThemeMenuButton } from "./ThemeMenuButton";

import LogoutButton from "./LogoutButton";

export default function Navbar() {
  const params = useParams();
  const router = useRouter();

  const role = Array.isArray(params.role) ? params.role[0] : params.role;
  const userId = Array.isArray(params.id) ? params.id[0] : params.id;

  useEffect(() => {
    role === "staff" || role === "student" ? null : router.push("/auth/signin");
  }, [role, router]);

  return (
    <nav className="fixed top-0 w-full py-7 px-[4.2rem] flex justify-between">
      <div className="flex">
        <p className="text-2xl font-bold">Noter</p>
      </div>

      <div className="flex gap-2">
        <ThemeMenuButton />

        {(role === "staff" || role === "student") && userId && <LogoutButton />}
      </div>
    </nav>
  );
}
