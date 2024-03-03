'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { contactFormSchema } from '@/lib/validations/ContactFormSchema';
import { useContactMutation } from '@/hooks/contactHook';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useEffect } from 'react';

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
      <form onSubmit={contactForm.handleSubmit(handleSend)}>
        <FormField
          control={contactForm.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Report a bug, suggest a feature, or just say hi!"
                  className="resize-none"
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
              <FormControl>
                <input
                  {...field}
                  id="attachments"
                  type="file"
                  multiple
                  className="w-full"
                />
              </FormControl>
              <FormDescription>
                Attach screenshots, logs, or any other files that can help us
                understand your message better.
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
            className: 'w-full',
            type: 'submit',
          }}
        />
      </form>
    </Form>
  );
}
