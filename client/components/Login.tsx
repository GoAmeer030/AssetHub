/* eslint-disable react/no-unescaped-entities */
'use client';

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Meteors } from './ui/meteors';

import Footer from '@/components/Footer';
import LoginForm from '@/components/form/LoginForm';

export function Login() {
  return (
    <div className="flex h-screen w-full z-30 flex-col justify-center items-center pb-5 pt-[13vh] mt-[-8rem]">
      <Card className="w-[90vw] max-w-[400px] relative overflow-hidden">
        <Meteors number={20} className="absolute max-w-[400px]" />

        <CardHeader>
          <CardTitle>Noter</CardTitle>
          <CardDescription>
            Notes and resource sharing made easy.
          </CardDescription>
        </CardHeader>

        <LoginForm />
      </Card>

      <Footer />
    </div>
  );
}
