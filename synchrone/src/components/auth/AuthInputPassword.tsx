'use client';

import { useState } from 'react';
import { AuthInput } from './AuthInput';
import { HidePasswordInjection } from './HidePasswordInjection';
import { KeyRound } from 'lucide-react';

export const AuthInputPassword = ({
  ref,
}: {
  ref?: React.RefObject<HTMLInputElement | null>;
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AuthInput
      Icon={KeyRound}
      placeholder="Пароль"
      type={showPassword ? 'text' : 'password'}
      name="password"
      minLength={8}
      maxLength={100}
      label="Пароль"
      ref={ref}
      injection={
        <HidePasswordInjection
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />
      }
    />
  );
};
