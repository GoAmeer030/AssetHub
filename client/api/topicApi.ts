import axios, { AxiosResponse } from 'axios';

import { useAccessTokenStore } from '@/stores/tokenStore/accessTokenStore';

import { topicType } from '@/types/topicType';

export const postAddTopic = async (uploadDetails: topicType) => {
  const formData = new FormData();

  formData.append('syllabus', uploadDetails.syllabus);
  formData.append('year', uploadDetails.year);
  formData.append('department', uploadDetails.department);
  formData.append('semester', uploadDetails.semester);
  formData.append('subjectCode', uploadDetails.subjectcode);
  formData.append('topicName', uploadDetails.topicname);
  formData.append('topicDesc', uploadDetails.topicdesc);

  try {
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
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message);
    }
  }
};

export const getTopics = async (data: topicType | { staffId: string }) => {
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

  try {
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
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message);
    }
  }
};

export const deleteTopic = async (fileId: string) => {
  try {
    const response: AxiosResponse = await axios.delete(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/deletetopic/${fileId}`,
      {
        headers: {
          authorization: `Bearer ${useAccessTokenStore.getState().accessToken}`,
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
