import axios, { AxiosResponse } from 'axios';

import { useAccessTokenStore } from '@/stores/tokenStore/accessTokenStore';
import { assetType } from '@/types/assetType';

export const postAddAsset = async ({
  uploadDetails,
  topicid,
}: {
  uploadDetails: assetType;
  topicid: string;
}): Promise<AxiosResponse> => {
  const formData = new FormData();

  formData.append('topicId', topicid);
  formData.append('assetName', uploadDetails.assetname);
  formData.append('assetType', uploadDetails.assettype);

  if (uploadDetails.asseturl !== null) {
    formData.append('assetUrl', uploadDetails.asseturl);
  } else if (uploadDetails.file !== null) {
    formData.append('file', uploadDetails.file);
  }

  const response: AxiosResponse = await axios.post(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/addasset`,
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

  return response;
};

export const deleteAsset = async (assetId: string): Promise<AxiosResponse> => {
  const response: AxiosResponse = await axios.delete(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/deleteasset/${assetId}`,
    {
      headers: {
        authorization: `Bearer ${useAccessTokenStore.getState().accessToken}`,
      },
    },
  );

  return response;
};
