'use client';

import { FC } from 'react';
import { Button } from '../common';
import { UserRoundPlus } from 'lucide-react';
import { toastError, toastInfo } from '@/lib/toast';
import { ClientFetch } from '@/utils/ClientFetch';
import { APIResponse } from '@/types/common/APIResponse';

interface InviteUserButtonProps {
  workspaceId: string;
}

export const InviteUserButton: FC<InviteUserButtonProps> = ({ workspaceId }) => {
  const handleInviteUser = async () => {
    const res = await ClientFetch<
      APIResponse & {
        inviteLinkId: string;
      }
    >(`/api/workspaces/invite/${workspaceId}`, {
      method: 'POST',
    });
    
    const inviteUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/workspaces/invite/${res.inviteLinkId}`;

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
