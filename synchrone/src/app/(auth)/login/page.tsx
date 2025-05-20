'use client';

import { AuthFormWrapper, AuthInputEmail, AuthInputPassword } from '@/components/auth';
import { SubmitButton, Typography } from '@/components/common';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <AuthFormWrapper title="Вход в аккаунт">
      <AuthInputEmail />
      <AuthInputPassword />
      <Typography variant="p" className="text-center">
        Еще не зарегистрированы?{' '}
        <Link href="/sign-up" className="text-blue-600 font-medium">
          Зарегистрироваться
        </Link>
      </Typography>
      <SubmitButton>Войти</SubmitButton>
    </AuthFormWrapper>
  );
}
