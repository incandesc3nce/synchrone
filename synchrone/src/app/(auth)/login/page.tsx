'use client';

import { AuthFormWrapper, AuthInputEmail, AuthInputPassword } from '@/components/auth';
import { SubmitButton, Typography } from '@/components/common';
import { APIResponse } from '@/interfaces/auth/APIResponse';
import { toastSuccess, toastError } from '@/lib/toast';
import { APIFetch } from '@/utils/APIFetch';
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

    const { message, success } = await APIFetch<APIResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
    });

    setIsLoading(false);

    if (success) {
      toastSuccess(message);
      router.push('/workspaces');
    } else {
      toastError(message);
    }
  };

  return (
    <AuthFormWrapper title="Вход в аккаунт">
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
