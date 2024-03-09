import axios, { AxiosResponse } from 'axios';

import { useAccessTokenStore } from '@/stores/tokenStore/accessTokenStore';
import { assetType } from '@/types/assetType';

export const getAssets = async (
  data: assetType | { topicId: string },
): Promise<AxiosResponse> => {
  const params: any = {};
  if ('topicId' in data) {
    params.topicId = data.topicId;
  } else {
    params.assetname = data.assetname;
    params.assettype = data.assettype;
  }

  const response: AxiosResponse = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/getassets`,
    {
      headers: {
        authorization: `Bearer ${useAccessTokenStore.getState().accessToken}`,
      },
      params: params,
    },
  );

  console.log('response', response);
  return response;
};
