import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { staffState } from '@/types/usersTypes/staffType';

export const useStaffStore = create(
  persist<staffState>(
    (set) => ({
      staffID: '',
      password: '',
      staffName: '',
      designation: '',
      photo: '',

      setStaffID: (staffID: string) => set({ staffID }),
      setPassword: (password: string) => set({ password }),
      setStaffName: (staffName: string) => set({ staffName }),
      setDesignation: (designation: string) => set({ designation }),
      setPhoto: (photo: File | string) => set({ photo }),

      resetStaff: () =>
        set({
          staffID: '',
          password: '',
          staffName: '',
          designation: '',
          photo: null,
        }),
    }),
    {
      name: 'staffStore',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
