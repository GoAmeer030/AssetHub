import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { accessTokenState } from '@/types/tokenType/accessTokenType';

export const useAccessTokenStore = create(
  persist<accessTokenState>(
    (set) => ({
      accessToken: '',
      setAccessToken: (accessToken: string) => set({ accessToken }),
    }),
    {
      name: 'accessToken',
    },
  ),
);
