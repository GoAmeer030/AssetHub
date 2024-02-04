import { create } from "zustand";
import { staffState } from "@/types/usersTypes/staffType";

export const useStaffStore = create<staffState>((set) => ({
    staffID: '',
    password: '',

    setStaffID: (staffID: string) => set({ staffID }),
    setPassword: (password: string) => set({ password }),

    resetStaff: () => set({ staffID: '', password: '' })
}));