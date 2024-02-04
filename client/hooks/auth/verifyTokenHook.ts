import { useMutation } from "@tanstack/react-query";
import { SingletonRouter } from 'next/router';

import { postVerifyToken } from "@/api/auth/verifyToken";
import { useStaffStore } from "@/stores/usersStore/staffStore";
import { useStudentStore } from "@/stores/usersStore/studentStore";

export function useVerifyTokenMutation() {

    const mutation = useMutation({
        mutationFn: postVerifyToken,
        onSuccess: (data) => {
            if ('staffID' in data.data) {
                const staffID = data.data.staffID;
                useStaffStore.getState().setStaffID(staffID);
                data.data.role = 1;
            } else if ('regNo' in data.data) {
                const regNo = data.data.regNo;
                useStudentStore.getState().setRegNo(regNo);
                data.data.role = 0;
            }
        },
        retry: 0,
    })

    return mutation;
}