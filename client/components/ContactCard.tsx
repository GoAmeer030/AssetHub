'use client';

import { Card, CardHeader, CardTitle } from '@/components/ui/card';

import Footer from '@/components/Footer';
import ContactForm from '@/components/form/ContactForm';

import { Separator } from '@/components/ui/separator';

export function ContactCard() {
  return (
    <div className="flex h-screen w-full z-30 flex-col justify-center items-center pb-5 pt-[13vh] mt-[-8rem]">
      <Card className="w-[90%] max-w-[400px] relative overflow-hidden">
        <CardHeader>
          <CardTitle>Contact Us</CardTitle>
        </CardHeader>
        <Separator className="mt-[-0.4rem] mb-[0.8rem]" />

        <ContactForm />
      </Card>

      <Footer />
    </div>
  );
}
