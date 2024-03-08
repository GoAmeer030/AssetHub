import { create } from 'zustand';

export type userRoleIdType = {
  id: string;
  role: string;

  setId: (id: string) => void;
  setRole: (role: string) => void;

  resetRoleId: () => void;
};

export const useUserRoleIdStore = create<userRoleIdType>((set) => ({
  id: '',
  role: '',

  setId: (id: string) => set({ id }),
  setRole: (role: string) => set({ role }),

  resetRoleId: () => set({ id: '', role: '' }),
}));
