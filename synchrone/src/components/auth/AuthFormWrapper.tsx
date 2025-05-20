import { ReactNode } from 'react';
import { Typography } from '../common';

export const AuthFormWrapper = ({
  title,
  children,
}: {
  title: ReactNode;
  children: ReactNode;
}) => {
  return (
    <div className="flex flex-col items-center p-4 py-8 w-96 mx-auto mx-w-sm space-y-8 bg-neutral-900 rounded-3xl font-raleway">
      <Typography variant="h4">{title}</Typography>
      <form className="flex flex-col gap-8 w-full">
        <div className="flex flex-col gap-4">{children}</div>
      </form>
    </div>
  );
};
