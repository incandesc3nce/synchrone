import { FC } from 'react';
import { Typography } from '../common';
import { LinkButton } from '../common/LinkButton';
import { LogoutButton } from '../common/LogoutButton';

interface CoreHeaderProps {
  title: string;
}

export const CoreHeader: FC<CoreHeaderProps> = ({ title }) => {
  return (
    <div className="flex justify-between items-center">
      <Typography variant="h1">{title}</Typography>
      <div className="space-x-4">
        <LinkButton href="/">На главную</LinkButton>
        <LinkButton href="/workspaces">Проекты</LinkButton>
        <LinkButton href="/settings">Настройки</LinkButton>
        <LogoutButton />
      </div>
    </div>
  );
};
