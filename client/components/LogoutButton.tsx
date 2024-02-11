import Image from "next/image";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Spinner } from "@nextui-org/react";

import { Button } from "@/components/ui/button";
import { useFileStore } from "@/stores/fileStore";
import { useParamStore } from "@/stores/paramStore";
import { useToast } from "@/components/ui/use-toast";
import { useStaffStore } from "@/stores/usersStore/staffStore";
import { useStudentStore } from "@/stores/usersStore/studentStore";
import { useAccessTokenStore } from "@/stores/tokenStore/accessTokenStore";

export default function LogoutButton() {
  const router = useRouter();
  const { toast } = useToast();

  const { resetFile } = useFileStore();
  const { resetStaff } = useStaffStore();
  const { resetStudent } = useStudentStore();
  const { setAccessToken } = useAccessTokenStore();
  const setFiles = useParamStore((state) => state.setFiles);
  const setSearchResultTrigger = useParamStore(
    (state) => state.setSearchResultTrigger
  );
  const setSearchFiles = useParamStore((state) => state.setSearchFiles);

  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = () => {
    setAccessToken("");
    localStorage.removeItem("accessToken");

    resetFile();
    resetStaff();
    resetStudent();
    setSearchResultTrigger(false);
    setFiles([]);
    setSearchFiles([]);

    setLoggingOut(false);

    router.push("/auth/signin");

    toast({
      title: "Logged Out",
      description: "You have been logged out",
    });

    return;
  };

  return (
    <Button
      onClick={() => {
        handleLogout();
        setLoggingOut(true);
      }}
      disabled={loggingOut}
    >
      {loggingOut ? (
        <>
          <Spinner color="white" size="sm" className="pr-2" />
          Logging Out
        </>
      ) : (
        <>
          <Image
            src="/LogoutIcon.svg"
            alt="Search"
            width={20}
            height={20}
            className="mr-2"
          />
          Logout
        </>
      )}
    </Button>
  );
}
