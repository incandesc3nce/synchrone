import { User, Workspace } from '../../../../prisma/generated';
import { APIResponse } from '../../common/APIResponse';

export type WorkspaceWithUsers = Workspace & {
  users: User[];
  owner?: User;
};

export type WorkspaceEditor = APIResponse & {
  workspace: WorkspaceWithUsers;
};

export type WorkspaceResponse = APIResponse & {
  projects?: WorkspaceWithUsers[];
  project?: WorkspaceWithUsers;
};
