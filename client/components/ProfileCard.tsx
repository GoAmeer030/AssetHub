import { Avatar } from '@nextui-org/react';
import { Card, CardContent } from './ui/card';

export default function ProfileCard() {
  return (
    <Card className="z-30">
      <CardContent className="flex gap-5 mt-5">
        <Avatar isBordered color="secondary" size="lg" src="" name="DP" />

        <div className="flex flex-col">
          <p className="font-bold">{'staffName'}</p>
          <p className="text-small text-gray-400">{'Designation'}</p>
        </div>
      </CardContent>
    </Card>
  );
}
