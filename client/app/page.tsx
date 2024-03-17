'use client';

import { useVerifyToken } from '@/hooks/auth/verifyTokenHook';

export default function Page() {
  useVerifyToken();

  return <main></main>;
}
