'use client';

import { useRouter } from 'next/navigation';
import { Button } from './Button';
import { FC } from 'react';
import { ClientFetch } from '@/utils/ClientFetch';
import { ButtonVariant } from '@/types/components/ButtonVariant';

interface LogoutButtonProps {
  variant?: ButtonVariant;
  className?: string;
}

export const LogoutButton: FC<LogoutButtonProps> = ({
  variant = 'contained',
  className,
}) => {
  const router = useRouter();
  const handleLogout = async () => {
    await ClientFetch('/api/auth/logout', {
      method: 'POST',
    });
    router.push('/');
  };

  return (
    <Button variant={variant} onClick={handleLogout} className={className}>
      Выйти
    </Button>
  );
};
