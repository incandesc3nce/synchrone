import { User, Workspace } from '@prisma/client';
import { APIResponse } from '../../common/APIResponse';
import { File } from '../../../../prisma/generated';

export type WorkspaceWithUsers = Workspace & {
  users: User[];
  owner?: User;
};

export type WorkspaceWithFiles = Workspace & {
  users: User[];
  files: File[];
};

export type WorkspaceEditor = APIResponse & {
  workspace: WorkspaceWithFiles;
};

export type WorkspaceResponse = APIResponse & {
  projects?: WorkspaceWithUsers[];
  project?: WorkspaceWithUsers;
};
