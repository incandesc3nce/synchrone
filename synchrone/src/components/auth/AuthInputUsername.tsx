import { User } from 'lucide-react';
import { AuthInput } from './AuthInput';

export const AuthInputUsername = ({
  ref,
}: {
  ref?: React.RefObject<HTMLInputElement | null>;
}) => {
  return (
    <AuthInput
      Icon={User}
      placeholder="Имя пользователя"
      type="text"
      ref={ref}
      name="username"
      minLength={3}
      maxLength={100}
      label="Username"
    />
  );
};
