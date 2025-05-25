'use client';

import { useSocket } from '@/hooks/common';
import { Typography } from '../common';
import { EditorUser } from './EditorUser';

export const EditorSidebar = () => {
  const { workspace, io } = useSocket();

  return (
    <aside className="w-64 h-full max-h-screen bg-gray-900 p-4 fixed top-0">
      <Typography variant="h2" className='text-center'>synchrone</Typography>
      <hr style={{
        height: 0,
        borderTopWidth: '2px',
        filter: 'drop-shadow(0 0 7px oklch(0.623 0.214 259.815))',
        willChange: 'filter',
        borderImage: '-webkit-linear-gradient(left, transparent, oklch(0.623 0.214 259.815), transparent) 1',
      }} />
      <Typography variant="h3" className="text-gray-300 my-4">
        {workspace.name}
      </Typography>
      <Typography variant="h4" className="text-gray-300 mb-2 !text-lg !font-medium">
        Подключены
      </Typography>
      <ul className="space-y-2 flex flex-wrap gap-2">
        {io.currentUsers.map((user) => (
          <li key={user.id}>
            <EditorUser user={user} />
          </li>
        ))}
      </ul>
    </aside>
  );
};
