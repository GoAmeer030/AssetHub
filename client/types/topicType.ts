export type topicState = {
  id: string;
  syllabus: string;
  year: string;
  department: string;
  semester: string;
  subjectcode: string;
  topicname: string;
  topicdesc: string;

  setId: (fileid: string) => void;
  setSyllabus: (syllabus: string) => void;
  setYear: (year: string) => void;
  setDepartment: (department: string) => void;
  setSemester: (semester: string) => void;
  setSubjectCode: (subjectCode: string) => void;
  setTopicName: (topicname: string) => void;
  setTopicDesc: (topicdesc: string) => void;

  resetTopic: () => void;
};

export type topicType = {
  id: string;
  syllabus: string;
  year: string;
  department: string;
  semester: string;
  subjectcode: string;
  topicname: string;
  topicdesc: string;
};
