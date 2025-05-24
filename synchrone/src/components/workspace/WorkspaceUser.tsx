'use client';

import { User } from '@prisma/client';
import { FC } from 'react';

interface WorkspaceUserProps {
  user: User;
  workspaceId: string;
  ownerId: string;
  isOwner: boolean;
  handleDeleteUser: (userId: string, workspaceId: string) => void;
}

export const WorkspaceUser: FC<WorkspaceUserProps> = ({
  user,
  workspaceId,
  ownerId,
  isOwner,
  handleDeleteUser,
}) => {
  return (
    <div className="flex gap-2">
      <span>
        {user.username} ({user.email})
      </span>
      {user.id === ownerId ? (
        <span className="text-gray-500">(Владелец)</span>
      ) : (
        <span className="text-gray-500">(Участник)</span>
      )}
      {isOwner && (
        <button
          className="text-red-500 cursor-pointer"
          onClick={() => handleDeleteUser(user.id, workspaceId)}>
          x
        </button>
      )}
    </div>
  );
};
