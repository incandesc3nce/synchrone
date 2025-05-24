import { EditorMain } from '@/components/editor/EditorMain';
import { ServerFetch } from '@/utils/ServerFetch';
import { WorkspaceEditor } from '@/types/core/workspace/WorkspaceResponse';

export default async function EditorPage({
  params,
}: {
  params: Promise<{ workspace_id: string }>;
}) {
  const { workspace_id } = await params;
  const workspaceResponse = await ServerFetch<WorkspaceEditor>(`${process.env.BASE_URL}/api/editor?workspace_id=${workspace_id}`);

  return (
    <div className="grid items-center justify-items-center min-h-screen gap-16 font-sans">
      <EditorMain workspaceResponse={workspaceResponse}/>
    </div>
  );
}
