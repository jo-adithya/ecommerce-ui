'use client';

import { useFormStatus } from 'react-dom';

import { Loader2 } from 'lucide-react';

import { Button } from './button';

type SubmitButtonProps = {
  pendingLabel?: string;
  className?: string;
  children?: React.ReactNode;
};
export function SubmitButton({
  pendingLabel,
  className,
  children,
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className={className} disabled={pending}>
      {pending && <Loader2 className="mr-2 w-5 h-5 animate-spin" />}
      {pending ? pendingLabel ?? children : children}
    </Button>
  );
}
