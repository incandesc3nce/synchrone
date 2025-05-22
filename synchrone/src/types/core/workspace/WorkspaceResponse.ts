import { User, Workspace } from '@prisma/client';
import { APIResponse } from '../../common/APIResponse';

export type WorkspaceWithUsers = Workspace & {
  users: User[];
};

export type WorkspaceResponse = APIResponse & {
  projects?: WorkspaceWithUsers[];
  project?: WorkspaceWithUsers;
};
