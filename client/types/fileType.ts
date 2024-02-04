export type fileState = {
    batch: string;
    year: string;
    department: string;
    semester: string;
    subjectcode: string;
    filename: string;
    file: File | null;

    setBatch: (batch: string) => void;
    setYear: (year: string) => void;
    setDepartment: (department: string) => void;
    setSemester: (semester: string) => void;
    setSubjectCode: (subjectCode: string) => void;
    setFileName: (fileName: string) => void;
    setFile: (file: File) => void;

    resetFile: () => void;
}

export type fileType = {
    batch: string;
    year: string;
    department: string;
    semester: string;
    subjectcode: string;
    filename: string;
    file: File | null;
}