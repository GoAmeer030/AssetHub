import { useRouter } from 'next/navigation';

import { LogoutIcon } from '@/components/icons/LogoutIcon';
import { useToast } from '@/components/ui/use-toast';

import { useParamStore } from '@/stores/paramStore';
import { useAccessTokenStore } from '@/stores/tokenStore/accessTokenStore';
import { useTopicStore } from '@/stores/topicStore';
import { useStaffStore } from '@/stores/usersStore/staffStore';
import { useStudentStore } from '@/stores/usersStore/studentStore';
import { useUserRoleIdStore } from '@/stores/usersStore/userRoleIdStore';

export default function LogoutButton() {
  const router = useRouter();
  const { toast } = useToast();

  const { resetStaff } = useStaffStore();
  const { resetRoleId } = useUserRoleIdStore();
  const { resetStudent } = useStudentStore();
  const { setAccessToken } = useAccessTokenStore();
  const { resetTopic: resetFile } = useTopicStore();
  const setFiles = useParamStore((state) => state.setTopics);
  const setSearchFiles = useParamStore((state) => state.setSearchTopics);
  const setSearchResultTrigger = useParamStore(
    (state) => state.setSearchTopicResultTrigger,
  );

  const handleLogout = () => {
    setAccessToken('');
    localStorage.removeItem('accessToken');

    resetFile();
    resetStaff();
    resetStudent();
    resetRoleId();
    setSearchResultTrigger(false);
    setFiles([]);
    setSearchFiles([]);

    router.push('/auth/signin');

    toast({
      title: 'Logged Out',
      description: 'You have been logged out',
    });

    return;
  };

  return (
    <p className="flex" onClick={handleLogout}>
      <span className="text-lg mr-2">
        <LogoutIcon />
      </span>
      Logout
    </p>
  );
}
