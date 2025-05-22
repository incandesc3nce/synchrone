import { Typography } from '@/components/common';
import { Workspace } from '../../../components/workspace/Workspace';
import { ServerFetch } from '@/utils/ServerFetch';
import { LogoutButton } from '@/components/common/LogoutButton';
import { WorkspaceResponse } from '@/types/workspace/WorkspaceResponse';
import { LinkButton } from '@/components/common/LinkButton';

export default async function WorkspacesPage() {
  const promise = ServerFetch<WorkspaceResponse>('http://localhost:3000/api/workspaces', {
    method: 'GET',
  });

  return (
    <div className="p-4 flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <Typography variant="h1">Проекты</Typography>
        <div className="space-x-4">
          <LinkButton href="/">На главную</LinkButton>
          <LogoutButton />
        </div>
      </div>
      <Workspace promise={promise} />
    </div>
  );
}
