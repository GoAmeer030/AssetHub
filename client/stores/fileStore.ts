import { create } from 'zustand';
import { fileState } from '@/types/fileType';

export const useFileStore = create<fileState>((set) => ({
    batch: '',
    year: '',
    department: '',
    semester: '',
    subjectcode: '',
    filename: '',
    file: null,

    setBatch: (batch: string) => set({ batch }),
    setYear: (year: string) => set({ year }),
    setDepartment: (department: string) => set({ department }),
    setSemester: (semester: string) => set({ semester }),
    setSubjectCode: (subjectCode: string) => set({ subjectcode: subjectCode }),
    setFileName: (fileName: string) => set({ filename: fileName }),
    setFile: (file: File) => set({ file }),

    resetFile: () => set({ batch: '', year: '', department: '', semester: '', subjectcode: '', filename: '', file: null })
}));