import { create } from 'zustand';

import { userRoleIdType } from '@/types/userRoleIdType';

export const useUserRoleIdStore = create<userRoleIdType>((set) => ({
  id: '',
  role: '',

  setId: (id: string) => set({ id }),
  setRole: (role: string) => set({ role }),

  resetRoleId: () => set({ id: '', role: '' }),
}));
