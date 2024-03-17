import axios, { AxiosResponse } from 'axios';

import { useAccessTokenStore } from '@/stores/tokenStore/accessTokenStore';

export const getStaffDetail = async (staffID: string) => {
  const params: any = {};
  params.staffID = staffID;

  try {
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
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message);
    }
  }
};
