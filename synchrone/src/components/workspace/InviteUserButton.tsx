'use client';

import { FC } from 'react';
import { Button } from '../common';
import { UserRoundPlus } from 'lucide-react';
import { toastError, toastInfo } from '@/lib/toast';

interface InviteUserButtonProps {
  workspaceId: string;
}

export const InviteUserButton: FC<InviteUserButtonProps> = ({ workspaceId }) => {
  const handleInviteUser = async () => {
    const inviteUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/workspaces/invite/${workspaceId}`;

    try {
      await navigator.clipboard.writeText(inviteUrl);
      toastInfo('Приглашение', 'Ссылка для приглашения скопирована в буфер обмена!');
    } catch (error) {
      console.error('Ошибка при копировании ссылки:', error);
      toastError('Не удалось скопировать ссылку. Пожалуйста, попробуйте еще раз.');
    }
  };

  return (
    <Button variant="custom" className="cursor-pointer" onClick={handleInviteUser}>
      <UserRoundPlus className="size-5" />
    </Button>
  );
};
