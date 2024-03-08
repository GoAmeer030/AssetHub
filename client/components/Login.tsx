/* eslint-disable react/no-unescaped-entities */
'use client';

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Meteors } from './ui/meteors';
import { Separator } from './ui/separator';

import Footer from '@/components/Footer';
import LoginForm from '@/components/form/LoginForm';

export function Login() {
  return (
    <div className="flex h-screen w-full z-30 flex-col justify-center items-center pb-5 pt-[13vh] mt-[-8rem]">
      <Card className="w-[90vw] max-w-[360px] relative overflow-hidden">
        <Meteors number={20} className="absolute max-w-[400px]" />

        <CardHeader>
          <CardTitle>Welcome back</CardTitle>
          <CardDescription>Login to access your account</CardDescription>
        </CardHeader>
        <Separator className="mt-[-0.6rem] mb-[0.8rem]" />

        <LoginForm />
      </Card>

      <Footer />
    </div>
  );
}
