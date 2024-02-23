export type staffState = {
  staffID: string;
  password: string;
  staffName: string;
  designation: string;
  photo: File | null;

  setStaffID: (staffID: string) => void;
  setPassword: (password: string) => void;
  setStaffName: (staffName: string) => void;
  setDesignation: (designation: string) => void;
  setPhoto: (photo: File) => void;

  resetStaff: () => void;
};

export type staffType = {
  staffID: string;
  password: string;
  staffName: string;
  designation: string;
  photo: File | null;
};
