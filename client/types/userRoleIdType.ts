export type userRoleIdType = {
  id: string;
  role: string;

  setId: (id: string) => void;
  setRole: (role: string) => void;

  resetRoleId: () => void;
};
