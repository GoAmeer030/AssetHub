'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { ThemeMenuButton } from './ThemeMenuButton';

import LogoutButton from './LogoutButton';

export default function Navbar() {
  const params = useParams();
  const router = useRouter();

  const role = Array.isArray(params.role) ? params.role[0] : params.role;
  const userId = Array.isArray(params.id) ? params.id[0] : params.id;

  useEffect(() => {
    role === 'staff' || role === 'student' ? null : router.push('/auth/signin');
  }, [role, router]);

  return (
    <div className="w-[90%] m-auto">
      <nav className="fixed top-0 h-[10vh] w-[90%] z-30 flex justify-between items-center">
        <div className="flex">
          <p className="text-2xl font-bold bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            Assets Hub
          </p>
        </div>

        <div className="flex gap-2">
          <ThemeMenuButton />

          {(role === 'staff' || role === 'student') && userId && (
            <LogoutButton />
          )}
        </div>
      </nav>
    </div>
  );
}
