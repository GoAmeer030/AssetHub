import { create } from 'zustand';
import { staffState } from '@/types/usersTypes/staffType';

export const useStaffStore = create<staffState>((set) => ({
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
}));
