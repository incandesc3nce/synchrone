import { ReactNode } from 'react';
import { Typography } from '../common';

export const AuthFormWrapper = ({
  title,
  onSubmit,
  children,
}: {
  title: ReactNode;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
}) => {
  return (
    <div className="flex flex-col items-center p-4 py-8 w-96 mx-auto mx-w-sm space-y-8 bg-neutral-900 rounded-3xl font-raleway">
      <Typography variant="h4">{title}</Typography>
      <form className="flex flex-col gap-8 w-full" onSubmit={onSubmit}>
        <div className="flex flex-col gap-4">{children}</div>
      </form>
    </div>
  );
};
