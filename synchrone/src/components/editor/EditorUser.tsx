import { FC, useMemo, useState } from 'react';
import { getRandomColor } from '@/utils/getRandomColor';
import { isDarkColor } from '@/utils/isDarkColor';
import { TokenPayload } from '@/types/auth/TokenPayload';

interface EditorUserProps {
  user: TokenPayload;
}

export const EditorUser: FC<EditorUserProps> = ({ user }) => {
  const [color] = useState(getRandomColor());
  const isDark = useMemo(() => {
    return isDarkColor(color);
  }, [color]);

  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <div
        className="size-10 rounded-full flex items-center justify-center"
        style={{
          backgroundColor: color,
        }}>
        <span
          style={{
            color: isDark ? '#ffffff' : '#000000',
          }}
          className="text-sm font-bold">
          {user.username[0]}
        </span>
      </div>
      <span className="text-sm font-medium text-gray-300">{user.username}</span>
    </div>
  );
};
