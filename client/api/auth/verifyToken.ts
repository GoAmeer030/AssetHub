import axios, { AxiosResponse } from 'axios';

export const postVerifyToken = async (accessToken: string): Promise<AxiosResponse> => {
    // console.log(accessToken);

    try {
        const response: AxiosResponse = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/verify-token`, {}, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'authorization': `Bearer ${accessToken}`
            }
        });

        return response;
    } catch (error) {
        throw error;
    }
}