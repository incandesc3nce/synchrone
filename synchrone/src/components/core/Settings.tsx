'use client';

import { UserResponse } from '@/types/core/settings/UserResponse';
import { FC, useEffect, useRef, useState } from 'react';
import { AuthFormWrapper, AuthInputEmail, AuthInputPassword } from '../auth';
import { AuthInputUsername } from '../auth/AuthInputUsername';
import { SubmitButton } from '../common';
import { ClientFetch } from '@/utils/ClientFetch';
import { APIResponse } from '@/types/common/APIResponse';
import { toastSuccess, toastError } from '@/lib/toast';

interface SettingsProps {
  userData: UserResponse;
}

export const Settings: FC<SettingsProps> = ({ userData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (userData) {
      if (emailRef.current) {
        emailRef.current.value = userData.email;
      }
      if (usernameRef.current) {
        usernameRef.current.value = userData.username;
      }
    }
  }, [userData]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = emailRef.current?.value;
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !username) {
      toastError('Пожалуйста, заполните все поля');
      return;
    }

    setIsLoading(true);

    try {
      const res = await ClientFetch<APIResponse>('/api/user', {
        method: 'PATCH',
        body: JSON.stringify({
          email,
          username,
          password,
        }),
      });

      if (res.success) {
        toastSuccess(res.message);
      } else {
        toastError(res.message);
      }
    } catch (error) {
      const err = error as Error;
      toastError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthFormWrapper title="Настройки" onSubmit={handleSubmit}>
      <AuthInputEmail ref={emailRef} />
      <AuthInputUsername ref={usernameRef} />
      <AuthInputPassword ref={passwordRef} />
      <SubmitButton isLoading={isLoading}>Сохранить</SubmitButton>
    </AuthFormWrapper>
  );
};
