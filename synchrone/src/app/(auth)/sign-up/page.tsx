'use client';

import { AuthFormWrapper, AuthInputEmail, AuthInputPassword } from '@/components/auth';
import { AuthInputUsername } from '@/components/auth/AuthInputUsername';
import { SubmitButton, Typography } from '@/components/common';
import { APIResponse } from '@/types/common/APIResponse';
import { toastError, toastSuccess } from '@/lib/toast';
import { ClientFetch } from '@/utils/ClientFetch';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { validateEmail } from '@/lib/validation/email';
import { validatePassword } from '@/lib/validation/password';

export default function SignUpPage() {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = emailRef.current?.value;
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    
    if (!email || !username || !password) {
      toastError('Пожалуйста, заполните все поля.');
      return;
    }
    
    const emailErrorMessage = validateEmail(email);
    if (emailErrorMessage) {
      toastError(emailErrorMessage);
      return;
    }
    
    const passwordErrorMessage = validatePassword(password);
    if (passwordErrorMessage) {
      toastError(passwordErrorMessage);
      return;
    }
    
    setIsLoading(true);
    try {
      const { message, success } = await ClientFetch<APIResponse>('/api/auth/sign-up', {
        method: 'POST',
        body: JSON.stringify({
          email,
          username,
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
    <AuthFormWrapper title="Регистрация" onSubmit={handleSubmit}>
      <AuthInputEmail ref={emailRef} />
      <AuthInputUsername ref={usernameRef} />
      <AuthInputPassword ref={passwordRef} />
      <Typography variant="p" className="text-center">
        Уже есть аккаунт?{' '}
        <Link href="/login" className="text-blue-600 font-medium">
          Войти
        </Link>
      </Typography>
      <SubmitButton isLoading={isLoading}>Зарегистрироваться</SubmitButton>
    </AuthFormWrapper>
  );
}
