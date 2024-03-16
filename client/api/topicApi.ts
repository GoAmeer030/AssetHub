import axios, { AxiosResponse } from 'axios';

import { topicType } from '@/types/topicType';

import { useAccessTokenStore } from '@/stores/tokenStore/accessTokenStore';

export const postAddTopic = async (
  uploadDetails: topicType,
): Promise<AxiosResponse> => {
  const formData = new FormData();

  formData.append('syllabus', uploadDetails.syllabus);
  formData.append('year', uploadDetails.year);
  formData.append('department', uploadDetails.department);
  formData.append('semester', uploadDetails.semester);
  formData.append('subjectCode', uploadDetails.subjectcode);
  formData.append('topicName', uploadDetails.topicname);
  formData.append('topicDesc', uploadDetails.topicdesc);

  const response: AxiosResponse = await axios.post(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/addtopic`,
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

export const getTopics = async (
  data: topicType | { staffId: string },
): Promise<AxiosResponse> => {
  const params: any = {};
  if ('staffId' in data) {
    params.staffId = data.staffId;
  } else {
    params.syllabus = data.syllabus;
    params.year = data.year;
    params.department = data.department;
    params.semester = data.semester;
    params.subjectCode = data.subjectcode;
    params.topicName = data.topicname;
  }

  // console.log('params', params);

  const response: AxiosResponse = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/gettopics`,
    {
      headers: {
        authorization: `Bearer ${useAccessTokenStore.getState().accessToken}`,
      },
      params: params,
    },
  );

  return response;
};

export const deleteTopic = async (fileId: string): Promise<AxiosResponse> => {
  const response: AxiosResponse = await axios.delete(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/deletetopic/${fileId}`,
    {
      headers: {
        authorization: `Bearer ${useAccessTokenStore.getState().accessToken}`,
      },
    },
  );

  return response;
};
