import { create } from 'zustand';
import { fileState } from '@/types/fileType';

export const useFileStore = create<fileState>((set) => ({
    id: '',
    syllabus: '',
    year: '',
    department: '',
    semester: '',
    subjectcode: '',
    filename: '',
    file: null,
    fileurl: '',

    setId: (fileid: string) => set({ id: fileid }),
    setSyllabus: (syllabus: string) => set({ syllabus }),
    setYear: (year: string) => set({ year }),
    setDepartment: (department: string) => set({ department }),
    setSemester: (semester: string) => set({ semester }),
    setSubjectCode: (subjectCode: string) => set({ subjectcode: subjectCode }),
    setFileName: (fileName: string) => set({ filename: fileName }),
    setFile: (file: File) => set({ file }),
    setFileUrl: (fileUrl: string) => set({ fileurl: fileUrl }),

    resetFile: () => set({ id: '', syllabus: '', year: '', department: '', semester: '', subjectcode: '', filename: '', file: null, fileurl: '' })
}));