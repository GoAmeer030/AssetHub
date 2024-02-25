/* eslint-disable react/no-unescaped-entities */
'use client';

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import Footer from '@/components/Footer';
import StaffRegisterForm from '@/components/form/StaffRegisterForm';

export function RegisterStaff() {
  return (
    <div className="flex h-screen w-full z-30 flex-col justify-center items-center pb-5 pt-[13vh] mt-[-8rem]">
      <Card className="w-[90vw] max-w-[400px] relative overflow-hidden">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>
            Create a new account for yourself as a staff
          </CardDescription>
        </CardHeader>

        <StaffRegisterForm />
      </Card>

      <Footer />
    </div>
  );
}
