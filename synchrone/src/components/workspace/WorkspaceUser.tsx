'use client';

import { User } from '@prisma/client';
import { FC } from 'react';

interface WorkspaceUserProps {
  user: User;
  workspaceId: string;
  handleDeleteUser: (userId: string, workspaceId: string) => void;
}

export const WorkspaceUser: FC<WorkspaceUserProps> = ({
  user,
  workspaceId,
  handleDeleteUser,
}) => {
  return (
    <div className="flex gap-2">
      <span>
        {user.username} ({user.email})
      </span>
      <button
        className="text-red-500 cursor-pointer"
        onClick={() => handleDeleteUser(user.id, workspaceId)}>
        x
      </button>
    </div>
  );
};
