import { create } from 'zustand';

export type roleIdType = {
  id: string;
  role: string;

  setId: (id: string) => void;
  setRole: (role: string) => void;

  resetRoleId: () => void;
};

export const useRoleIdStore = create<roleIdType>((set) => ({
  id: '',
  role: '',

  setId: (id: string) => set({ id }),
  setRole: (role: string) => set({ role }),

  resetRoleId: () => set({ id: '', role: '' }),
}));
