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
    <AuthFormWrapper title="Регистрация">
      <AuthInputEmail />
      <AuthInputPassword />
      <Typography variant="p" className="text-center">
        Уже есть аккаунт?{' '}
        <Link href="/login" className="text-blue-600 font-medium">
          Войти
        </Link>
      </Typography>
      <SubmitButton>Зарегистрироваться</SubmitButton>
    </AuthFormWrapper>
  );
}
