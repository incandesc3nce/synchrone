import { Mail } from 'lucide-react';
import { AuthInput } from './AuthInput';

export const AuthInputEmail = ({
  ref,
}: {
  ref?: React.RefObject<HTMLInputElement | null>;
}) => {
  return (
    <AuthInput
      Icon={Mail}
      placeholder="Email"
      type="email"
      name="email"
      ref={ref}
      minLength={3}
      maxLength={100}
      label="Email"
    />
  );
};
