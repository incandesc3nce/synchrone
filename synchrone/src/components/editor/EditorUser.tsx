import { FC, useMemo } from 'react';
import { isDarkColor } from '@/utils/isDarkColor';
import { TokenPayloadWithColor } from '@/types/auth/TokenPayload';

interface EditorUserProps {
  user: TokenPayloadWithColor;
}

export const EditorUser: FC<EditorUserProps> = ({ user }) => {
  const isDark = useMemo(() => {
    return isDarkColor(user.color);
  }, [user.color]);

  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <div
        className="size-10 rounded-full flex items-center justify-center"
        style={{
          backgroundColor: user.color,
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
