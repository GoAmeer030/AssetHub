import axios, { AxiosResponse } from 'axios';

import { useAccessTokenStore } from '@/stores/tokenStore/accessTokenStore';

export const getStaffDetail = async (
  staffID: string,
): Promise<AxiosResponse> => {
  const params: any = {};
  params.staffID = staffID;

  const response: AxiosResponse = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/getstaffdetails`,
    {
      headers: {
        authorization: `Bearer ${useAccessTokenStore.getState().accessToken}`,
      },
      params: params,
    },
  );

  return response;
};
