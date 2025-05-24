'use client';

import { useSocket } from '@/hooks/common';

export const EditorSidebar = () => {
  const { workspace, io } = useSocket();

  return (
    <aside className="w-64 h-full max-h-screen bg-gray-900 p-4 fixed top-0">
      <h2 className="text-lg font-semibold mb-4">{workspace.name}</h2>
      <ul className="space-y-2">
        {workspace.files.map((file) => (
          <li key={file.id} className="text-gray-300 hover:text-white cursor-pointer">
            {file.name}
          </li>
        ))}
      </ul>
    </aside>
  );
};
