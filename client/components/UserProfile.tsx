import { useStaffStore } from '@/stores/usersStore/staffStore';
import { User } from '@nextui-org/react';

export default function UserProfile({ userId }: { userId: string }) {
  const { staffName, designation, photo } = useStaffStore();

  let photoUrl = photo;
  if (photoUrl === '') {
    photoUrl = '';
  } else {
    photoUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/${photo}`;
  }
  // let regNum = regNo.toString();
  // regNum = regNum.substring(10);

  return (
    <User
      name={staffName || 'Name'}
      description={designation || 'Designation'}
      avatarProps={{ src: photoUrl }}
    />
  );
}
