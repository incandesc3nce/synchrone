import { ButtonVariant } from '@/types/components/ButtonVariant';
import Link from 'next/link';
import { FC } from 'react';
import { Button } from './Button';

interface LinkButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
}

export const LinkButton: FC<LinkButtonProps> = ({
  href,
  children,
  variant = 'contained',
}) => {
  return (
    <Button variant={variant} type="button">
      <Link href={href}>{children}</Link>
    </Button>
  );
};
