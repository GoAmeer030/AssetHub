/* eslint-disable react/no-unescaped-entities */
"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Footer from "@/components/Footer";
import LoginForm from "@/components/form/LoginForm";

export function Login() {
  return (
    <div className="flex h-screen w-full flex-col justify-center items-center pb-5 pt-[13vh] mt-[-8rem]">
      <Card className="w-[90vw] max-w-[400px]">
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
