import Image from "next/image";

import { useState } from "react";
import { useRouter } from "next/navigation";

import ButtonWithSpinner from "@/components/updatedui/ButtonWithSpinner";
import {LogoutIcon} from "@/components/icons/LogoutIcon";

import { useTopicStore } from "@/stores/topicStore";
import { useParamStore } from "@/stores/paramStore";
import { useToast } from "@/components/ui/use-toast";
import { useStaffStore } from "@/stores/usersStore/staffStore";
import { useStudentStore } from "@/stores/usersStore/studentStore";
import { useAccessTokenStore } from "@/stores/tokenStore/accessTokenStore";

export default function LogoutButton() {
  const router = useRouter();
  const { toast } = useToast();

  const { resetTopic: resetFile } = useTopicStore();
  const { resetStaff } = useStaffStore();
  const { resetStudent } = useStudentStore();
  const { setAccessToken } = useAccessTokenStore();
  const setFiles = useParamStore((state) => state.setTopics);
  const setSearchFiles = useParamStore((state) => state.setSearchTopics);
  const setSearchResultTrigger = useParamStore(
    (state) => state.setSearchResultTrigger
  );

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
    <ButtonWithSpinner 
      mutation={{isPending: loggingOut}}
      innerContent={
          <>
              <span className="text-lg mr-2">
                  <LogoutIcon />
              </span>
              Logout
          </>
      }
      innerContentOnLoading={"Logging Out"}
      props={{
        onClick: () => {
          handleLogout();
          setLoggingOut(true);
        }
      }}
    />
  );
}
