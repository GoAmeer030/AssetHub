import { useEffect } from 'react';
import { Avatar } from '@nextui-org/react';

import { Card, CardContent } from '@/components/ui/card';

import { useGetStaffDetails } from '@/hooks/userHooks';
import { useStaffStore } from '@/stores/usersStore/staffStore';

export default function ProfileCard({ userId }: { userId: string }) {
  const mutation = useGetStaffDetails();

  const {
    staffName,
    designation,
    photo,
    setStaffName,
    setDesignation,
    setPhoto,
  } = useStaffStore();

  useEffect(() => {
    mutation.mutate(userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  useEffect(() => {
    if (mutation.isSuccess) {
      const data = mutation.data?.data;
      if (data) {
        setStaffName(data.staffname);
        setDesignation(data.designation);
        setPhoto(data.photourl);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutation.isSuccess]);

  let photoUrl = photo;
  if (photoUrl === '') {
    photoUrl = '';
  } else {
    photoUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/${photo}`;
  }

  return (
    <Card>
      <CardContent className="flex gap-5 mt-5">
        <Avatar
          isBordered
          color="secondary"
          size="lg"
          src={photoUrl}
          name="DP"
        />

        <div className="flex flex-col mt-2">
          <p className="font-bold">{staffName || 'StaffName'}</p>
          <p className="text-small text-gray-400">
            {designation || 'Destination'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
