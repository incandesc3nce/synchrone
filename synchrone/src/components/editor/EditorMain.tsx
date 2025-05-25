'use client';

import { SocketProvider } from '@/hooks/common';
import { CodeSection } from './CodeSection';
import { EditorSidebar } from './EditorSidebar';
import { WorkspaceEditor } from '@/types/core/workspace/WorkspaceResponse';
import { TokenPayload } from '@/types/auth/TokenPayload';

export const EditorMain = ({
  workspaceResponse,
  user,
}: {
  workspaceResponse: WorkspaceEditor;
  user: TokenPayload;
}) => {
  return (
    <main className="size-full flex items-center">
      <SocketProvider workspaceResponse={workspaceResponse} user={user}>
        <EditorSidebar />
        <CodeSection />
      </SocketProvider>
    </main>
  );
};
