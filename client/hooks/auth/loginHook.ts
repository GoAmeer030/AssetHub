import {
    useMutation
} from "@tanstack/react-query";

import { postLogin } from "@/api/auth/login";
import { useAccessTokenStore } from "@/stores/tokenStore/accessTokenStore";
import { useStaffStore } from "@/stores/usersStore/staffStore";

export function useLoginMutation() {
    const {setAccessToken, accessToken} = useAccessTokenStore();

    const mutation = useMutation({
        mutationFn: postLogin,
        onSuccess: (data) => {
            const accessToken = data.data.accessToken;
            setAccessToken(accessToken);
            if ('staffid' in data.data.user) {
                const staffID = data.data.user.id;
                useStaffStore.getState().setStaffID(staffID);
            }
        },
        onError: () => {
            console.log("error");
        }
    })

    return mutation;
}