import axios, { AxiosResponse } from "axios";

import { staffType } from "@/types/usersTypes/staffType";
import { studentType } from "@/types/usersTypes/studentType";

export const postLogin = async (loginDetails: staffType | studentType): Promise<AxiosResponse> => {
    const formData = new FormData();

    if ("staffID" in loginDetails) {
        formData.append('staffID', loginDetails.staffID);
        formData.append('password', loginDetails.password);
    } else {
        formData.append('regNo', loginDetails.regNo);
    }

    const response: AxiosResponse = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/login`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

    return response;
}