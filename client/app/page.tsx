'use client';

import { useVerifyToken } from '@/hooks/auth/verifyTokenHook';

export default function Page() {
  useVerifyToken(true);

  return <main></main>;
}
