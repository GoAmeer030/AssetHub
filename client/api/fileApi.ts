import axios, { AxiosResponse } from "axios";

import { useAccessTokenStore } from "@/stores/tokenStore/accessTokenStore";
import { fileType } from "@/types/fileType";

export const postUploadFile = async (uploadFile: fileType): Promise<AxiosResponse> => {
    const formData = new FormData();
    formData.append('batch', uploadFile.batch);
    formData.append('year', uploadFile.year);
    formData.append('department', uploadFile.department);
    formData.append('semester', uploadFile.semester);
    formData.append('subjectCode', uploadFile.subjectcode);
    formData.append('fileName', uploadFile.filename);
    if (uploadFile.file) {
        formData.append('file', uploadFile.file);
    }

    console.log(formData);

    const response: AxiosResponse = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/addfile`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'authorization': `Bearer ${useAccessTokenStore.getState().accessToken}`
        }
    });

    return response;
}

export const getFiles = async (data: fileType): Promise<AxiosResponse> => {
    const formData = new FormData();
    formData.append('batch', data.batch);
    formData.append('year', data.year);
    formData.append('department', data.department);
    formData.append('semester', data.semester);
    formData.append('subjectCode', data.subjectcode);
    formData.append('fileName', data.filename);

    console.log("searching");
    
    const response: AxiosResponse = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/getfiles`);

    return response;
}