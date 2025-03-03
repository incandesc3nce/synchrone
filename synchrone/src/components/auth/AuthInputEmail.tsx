import { Mail } from 'lucide-react';
import { AuthInput } from './AuthInput';

export const AuthInputEmail = () => {
  return (
    <AuthInput
      Icon={Mail}
      placeholder="Email"
      type="email"
      name="email"
      minLength={3}
      maxLength={100}
      label="Email"
    />
  );
};
