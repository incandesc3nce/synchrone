import { Workspace } from '../../../components/workspace/Workspace';
import { ServerFetch } from '@/utils/ServerFetch';
import { WorkspaceResponse } from '@/types/core/workspace/WorkspaceResponse';
import { CoreHeader } from '@/components/core/CoreHeader';
import { getCurrentToken } from '@/lib/auth/cookie';

export default async function WorkspacesPage() {
  const { user } = await getCurrentToken();

  const promise = ServerFetch<WorkspaceResponse>(
    `${process.env.BASE_URL}/api/workspaces`,
    {
      method: 'GET',
    }
  );

  return (
    <div className="p-4 flex flex-col gap-8">
      <CoreHeader title="Проекты" />
      <Workspace promise={promise} currentUser={user} />
    </div>
  );
}
