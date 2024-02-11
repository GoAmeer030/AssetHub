import axios, { AxiosResponse } from "axios";

import { useAccessTokenStore } from "@/stores/tokenStore/accessTokenStore";
import { fileType } from "@/types/fileType";

export const postUploadFile = async (uploadFile: fileType): Promise<AxiosResponse> => {
    const formData = new FormData();
    formData.append('syllabus', uploadFile.syllabus);
    formData.append('year', uploadFile.year);
    formData.append('department', uploadFile.department);
    formData.append('semester', uploadFile.semester);
    formData.append('subjectCode', uploadFile.subjectcode);
    formData.append('fileName', uploadFile.filename);
    if (uploadFile.file) {
        formData.append('file', uploadFile.file);
    }

    const response: AxiosResponse = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/addfile`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'authorization': `Bearer ${useAccessTokenStore.getState().accessToken}`
        }
    });

    return response;
}

export const getFiles = async (data: fileType | any): Promise<AxiosResponse> => {
    const params: any = {};
    if ('staffId' in data) {
        params.staffId = data.staffId;
    } else {
        params.syllabus = data.syllabus;
        params.year = data.year;
        params.department = data.department;
        params.semester = data.semester;
        params.subjectCode = data.subjectcode;
        params.fileName = data.filename;
    }

    // console.log(params);

    const response: AxiosResponse = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/getfiles`, {
        params: params
    });

    return response;
}

export const deleteFile = async (fileId: string): Promise<AxiosResponse> => {
    const response: AxiosResponse = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/deletefile/${fileId}`, {
        headers: {
            'authorization': `Bearer ${useAccessTokenStore.getState().accessToken}`
        }
    });

    return response;
}