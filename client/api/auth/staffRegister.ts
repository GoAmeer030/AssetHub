import axios, { AxiosResponse } from 'axios';

import { staffType } from '@/types/usersTypes/staffType';

export const postStaffRegister = async (
  registerDetails: staffType,
): Promise<AxiosResponse> => {
  const formData = new FormData();

  formData.append('staffID', registerDetails.staffID);
  formData.append('staffName', registerDetails.staffName);
  formData.append('designation', registerDetails.designation);
  formData.append('password', registerDetails.password);
  formData.append('photo', registerDetails.photo as Blob);

  const response: AxiosResponse = await axios.post(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/staff-register`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return response;
};
