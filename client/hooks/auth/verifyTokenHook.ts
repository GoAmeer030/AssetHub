import { useToast } from "@/components/ui/use-toast";

import { useMutation } from "@tanstack/react-query";

import { postVerifyToken } from "@/api/auth/verifyToken";
import { useStaffStore } from "@/stores/usersStore/staffStore";
import { useStudentStore } from "@/stores/usersStore/studentStore";

export function useVerifyTokenMutation() {
    const { toast } = useToast();

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
        onError: () => {
            toast({
                title: "Something went wrong",
                description: "Error while verifying token!! Please try again later or contact developer",
                variant: "destructive"
            })
        },
        retry: 0,
    })

    return mutation;
}