import { create } from 'zustand';
import { topicState } from '@/types/topicType';

export const useTopicStore = create<topicState>((set) => ({
    id: '',
    syllabus: '',
    year: '',
    department: '',
    semester: '',
    subjectcode: '',
    topicname: '',
    topicdisc: '',

    setId: (fileid: string) => set({ id: fileid }),
    setSyllabus: (syllabus: string) => set({ syllabus }),
    setYear: (year: string) => set({ year }),
    setDepartment: (department: string) => set({ department }),
    setSemester: (semester: string) => set({ semester }),
    setSubjectCode: (subjectCode: string) => set({ subjectcode: subjectCode }),
    setTopicName: (topicname: string) => set({ topicname }),
    setTopicDisc: (topicdisc: string) => set({ topicdisc }),

    resetTopic: () => set({ id: '', syllabus: '', year: '', department: '', semester: '', subjectcode: '', topicname: '', topicdisc: '' })
}));