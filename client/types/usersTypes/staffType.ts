export type staffState = {
    staffID: string;
    password: string;

    setStaffID: (staffID: string) => void;
    setPassword: (password: string) => void;

    resetStaff: () => void;
}

export type staffType = {
    staffID: string;
    password: string;
}