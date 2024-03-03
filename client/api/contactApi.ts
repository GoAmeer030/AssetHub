import axios, { AxiosResponse } from 'axios';

import { useAccessTokenStore } from '@/stores/tokenStore/accessTokenStore';

export const postContact = async (message: string): Promise<AxiosResponse> => {
  let formData = new FormData();
  formData.append('message', message);

  const response: AxiosResponse = await axios.post(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/sendmail`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        authorization: `Bearer ${useAccessTokenStore.getState().accessToken}`,
      },
    },
  );

  return response;
};
