'use client';

import {
  AuthFormWrapper,
  AuthInputEmail,
  AuthInputPassword,
} from '@/components/auth';
import { SubmitButton, Typography } from '@/components/common';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <main className="flex justify-center items-center h-screen">
      <AuthFormWrapper title="Вход в аккаунт">
        <form className="flex flex-col gap-8 w-full">
          <div className="flex flex-col gap-4">
            <AuthInputEmail />
            <AuthInputPassword />
            <Typography variant="p" className="text-center">
              Еще не зарегистрированы?{' '}
              <Link href="/sign-up" className="text-blue-600 font-medium">
                Зарегистрироваться
              </Link>
            </Typography>
          </div>
          <SubmitButton>Войти</SubmitButton>
        </form>
      </AuthFormWrapper>
    </main>
  );
}
