'use client';

import { AuthFormWrapper, AuthInputEmail, AuthInputPassword } from '@/components/auth';
import { SubmitButton, Typography } from '@/components/common';
import { APIResponse } from '@/types/common/APIResponse';
import { toastSuccess, toastError } from '@/lib/toast';
import { ClientFetch } from '@/utils/ClientFetch';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

export default function LoginPage() {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      setIsLoading(false);
      return;
    }

    try {
      const { message, success } = await ClientFetch<APIResponse>('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (success) {
        toastSuccess(message);
        router.push('/workspaces');
      } else {
        toastError(message);
      }
    } catch (error) {
      const err = error as Error;
      toastError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthFormWrapper title="Вход в аккаунт" onSubmit={handleSubmit}>
      <AuthInputEmail ref={emailRef} />
      <AuthInputPassword ref={passwordRef} />
      <Typography variant="p" className="text-center">
        Еще не зарегистрированы?{' '}
        <Link href="/sign-up" className="text-blue-600 font-medium">
          Зарегистрироваться
        </Link>
      </Typography>
      <SubmitButton isLoading={isLoading}>Войти</SubmitButton>
    </AuthFormWrapper>
  );
}
