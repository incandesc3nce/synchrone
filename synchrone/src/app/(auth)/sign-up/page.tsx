'use client';

import {
  AuthFormWrapper,
  AuthInputEmail,
  AuthInputPassword,
} from '@/components/auth';
import { SubmitButton, Typography } from '@/components/common';
import Link from 'next/link';

export default function SignUpPage() {
  return (
    <main className="flex justify-center items-center h-screen">
      <AuthFormWrapper title="Регистрация">
        <form className="flex flex-col gap-8 w-full">
          <div className="flex flex-col gap-4">
            <AuthInputEmail />
            <AuthInputPassword />
            <Typography variant="p" className="text-center">
              Уже есть аккаунт?{' '}
              <Link href="/login" className="text-blue-600 font-medium">
                Войти
              </Link>
            </Typography>
          </div>
          <SubmitButton>Зарегистрироваться</SubmitButton>
        </form>
      </AuthFormWrapper>
    </main>
  );
}
