export type fileState = {
    id: string;
    syllabus: string;
    year: string;
    department: string;
    semester: string;
    subjectcode: string;
    filename: string;
    file: File | null;
    fileurl: string;

    setId: (fileid: string) => void;
    setSyllabus: (syllabus: string) => void;
    setYear: (year: string) => void;
    setDepartment: (department: string) => void;
    setSemester: (semester: string) => void;
    setSubjectCode: (subjectCode: string) => void;
    setFileName: (fileName: string) => void;
    setFile: (file: File) => void;
    setFileUrl: (fileUrl: string) => void;

    resetFile: () => void;
}

export type fileType = {
    id: string;
    syllabus: string;
    year: string;
    department: string;
    semester: string;
    subjectcode: string;
    filename: string;
    file: File | null;
    fileurl: string;
}