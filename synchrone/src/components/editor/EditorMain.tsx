'use client';

import { SocketProvider } from '@/hooks/common';
import { CodeSection } from './CodeSection';
import { EditorSidebar } from './EditorSidebar';
import { WorkspaceEditor } from '@/types/core/workspace/WorkspaceResponse';

export const EditorMain = ({ workspaceResponse }: { workspaceResponse: WorkspaceEditor }) => {
  return (
    <main className="size-full flex items-center">
      <SocketProvider workspaceResponse={workspaceResponse}>
        <EditorSidebar />
        <CodeSection />
      </SocketProvider>
    </main>
  );
};
