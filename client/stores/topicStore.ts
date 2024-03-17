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
  topicdesc: '',

  setId: (fileid: string) => set({ id: fileid }),
  setSyllabus: (syllabus: string) => set({ syllabus }),
  setYear: (year: string) => set({ year }),
  setDepartment: (department: string) => set({ department }),
  setSemester: (semester: string) => set({ semester }),
  setSubjectCode: (subjectcode: string) => set({ subjectcode }),
  setTopicName: (topicname: string) => set({ topicname }),
  setTopicDesc: (topicdesc: string) => set({ topicdesc }),

  resetTopic: () =>
    set({
      id: '',
      syllabus: '',
      year: '',
      department: '',
      semester: '',
      subjectcode: '',
      topicname: '',
      topicdesc: '',
    }),
}));
