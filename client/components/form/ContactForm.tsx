'use client';

import { z } from 'zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useContactMutation } from '@/hooks/contactHook';
import { contactFormSchema } from '@/lib/validations/ContactFormSchema';

import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import ButtonWithSpinner from '@/components/updatedui/ButtonWithSpinner';

type contactType = z.infer<typeof contactFormSchema> & { attachments?: File[] };

export default function ContactForm() {
  const mutation = useContactMutation();

  const contactForm = useForm<contactType>({
    resolver: zodResolver(contactFormSchema),
  });

  const handleSend = (data: contactType) => {
    mutation.mutate(data.message);
  };

  useEffect(() => {
    if (mutation.isSuccess) {
      contactForm.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutation.isSuccess]);

  return (
    <Form {...contactForm}>
      <form
        onSubmit={contactForm.handleSubmit(handleSend)}
        className="flex flex-col gap-3"
      >
        <FormField
          control={contactForm.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Report a bug, suggest a feature, or share your experience so far. We'd love to hear from you!"
                  className="resize-none min-h-[8rem]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={contactForm.control}
          name="attachments"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Attachments</FormLabel>
              <FormControl>
                <input
                  {...field}
                  id="attachments"
                  type="file"
                  multiple
                  className="w-full mt-3"
                />
              </FormControl>
              <FormDescription className="text-[0.7rem]">
                Attach screenshots, screen recordings, logs, or any other files
                that can help us understand your message better.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <ButtonWithSpinner
          mutation={mutation}
          innerContent="Send"
          innerContentOnLoading="Sending"
          props={{
            className: 'w-full mt-3',
            type: 'submit',
          }}
        />
      </form>
    </Form>
  );
}
