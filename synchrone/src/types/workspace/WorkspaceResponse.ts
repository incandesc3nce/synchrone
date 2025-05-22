import { Workspace } from '../../../prisma/generated';
import { APIResponse } from '../auth/APIResponse';

export type WorkspaceResponse = APIResponse & {
  projects?: Workspace[];
  project?: Workspace;
};
