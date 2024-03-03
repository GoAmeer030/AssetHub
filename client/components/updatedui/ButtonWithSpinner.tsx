'use client';

import { Spinner } from '@nextui-org/react';

import { Button } from '@/components/ui/button';

interface ButtonWithSpinnerProps {
  mutation?: { isPending: boolean };
  innerContent: React.ReactNode;
  innerContentOnLoading?: React.ReactNode;
  props: any;
}

export default function ButtonWithSpinner({
  mutation = { isPending: false },
  innerContent,
  innerContentOnLoading = null,
  props,
}: ButtonWithSpinnerProps) {
  return (
    <Button disabled={mutation.isPending} {...props}>
      {mutation.isPending ? (
        <>
          <Spinner color="white" size="sm" className="pr-2" />
          {innerContentOnLoading}
        </>
      ) : (
        innerContent
      )}
    </Button>
  );
}
