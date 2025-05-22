import { Workspace } from '../../../components/workspace/Workspace';
import { ServerFetch } from '@/utils/ServerFetch';
import { WorkspaceResponse } from '@/types/core/workspace/WorkspaceResponse';
import { CoreHeader } from '@/components/core/CoreHeader';

export default async function WorkspacesPage() {
  const promise = ServerFetch<WorkspaceResponse>('http://localhost:3000/api/workspaces', {
    method: 'GET',
  });

  return (
    <div className="p-4 flex flex-col gap-8">
      <CoreHeader title="Проекты" />
      <Workspace promise={promise} />
    </div>
  );
}
