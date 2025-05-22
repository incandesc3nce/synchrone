import { Workspace } from '@prisma/client';
import { APIResponse } from '../../common/APIResponse';

export type WorkspaceResponse = APIResponse & {
  projects?: Workspace[];
  project?: Workspace;
};
