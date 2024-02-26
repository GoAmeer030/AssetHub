export type staffState = {
  staffID: string;
  password: string;
  staffName: string;
  designation: string;
  photo: File | null | string;

  setStaffID: (staffID: string) => void;
  setPassword: (password: string) => void;
  setStaffName: (staffName: string) => void;
  setDesignation: (designation: string) => void;
  setPhoto: (photo: File | string) => void;

  resetStaff: () => void;
};

export type staffType = {
  staffID: string;
  password: string;
  staffName: string;
  designation: string;
  photo: File | null | string;
};
