'use client';

import { useSocket } from '@/hooks/common';
import { Typography } from '../common';
import { EditorUser } from './EditorUser';
import { Compass, Folder } from 'lucide-react';
import { LinkButton } from '../common/LinkButton';
import { Divider } from '../common/Divider';
import { LanguageSelect } from './LanguageSelect';
import { SaveContent } from './SaveContent';

export const EditorSidebar = () => {
  const { workspace, io } = useSocket();

  return (
    <aside className="w-64 h-full max-h-screen bg-gray-900 p-4 fixed top-0 flex flex-col justify-between">
      <div>
        <Typography variant="h2" className="text-center">
          synchrone
        </Typography>
        <Divider />
        <Typography variant="h3" className="text-gray-300 mb-4">
          {workspace.name}
        </Typography>
        <ul className="space-y-2 flex flex-wrap gap-2">
          {io.currentUsers.map((user) => (
            <li key={user.id}>
              <EditorUser user={user} />
            </li>
          ))}
        </ul>
      </div>
      <div>
        <div>
          <LanguageSelect />

          <SaveContent />

          <Typography variant="h4" className="text-gray-300 mb-2 !text-lg !font-medium">
            Состояние соединения
          </Typography>
          <Typography variant="p" className="text-gray-400">
            {io.status === 'connected' ? 'Подключено' : 'Отключено'}
          </Typography>
        </div>
        <Divider />
        <LinkButton href="/workspaces" variant="custom">
          <div className="flex gap-2 hover:bg-gray-800 py-1 px-2 rounded-lg">
            <Folder />
            <Typography variant="p">Проекты</Typography>
          </div>
        </LinkButton>
        <LinkButton href="/" variant="custom">
          <div className="flex gap-2 hover:bg-gray-800 py-1 px-2 rounded-lg">
            <Compass />
            <Typography variant="p">Главная страница</Typography>
          </div>
        </LinkButton>
      </div>
    </aside>
  );
};
