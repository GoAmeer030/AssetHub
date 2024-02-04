import { create } from "zustand";
import { studentState } from "@/types/usersTypes/studentType";

export const useStudentStore = create<studentState>((set) => ({
    regNo: '',

    setRegNo: (regNo: string) => set({ regNo }),

    resetStudent: () => set({ regNo: '' })
}));