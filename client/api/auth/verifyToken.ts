import axios, { AxiosResponse } from 'axios';

export const postVerifyToken = async (accessToken: string) => {
  try {
    const response: AxiosResponse = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/verify-token`,
      {},
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message);
    }
  }
};
