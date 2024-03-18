import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { userRoleIdType } from '@/types/userRoleIdType';

export const useUserRoleIdStore = create(
  persist<userRoleIdType>(
    (set) => ({
      id: '',
      role: '',

      setId: (id: string) => set({ id }),
      setRole: (role: string) => set({ role }),

      resetRoleId: () => set({ id: '', role: '' }),
    }),
    {
      name: 'userRoleId',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
