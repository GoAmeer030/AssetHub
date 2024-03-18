'use client';

import { Login } from '@/components/Login';

import { useVerifyToken } from '@/hooks/auth/verifyTokenHook';

export default function Page() {
  useVerifyToken(true);

  return (
    <div className="flex items-center justify-center h-[90%]">
      <Login />
    </div>
  );
}
