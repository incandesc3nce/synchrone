import { APIResponse } from '@/interfaces/auth/APIResponse';
import { setTokenCookie } from '@/lib/auth/cookie';
import { hashPassword } from '@/lib/auth/hashing';
import { signJWT } from '@/lib/auth/jwt';
import { prisma } from '@/lib/prisma';
import { validateEmail } from '@/lib/validation/email';
import { validatePassword } from '@/lib/validation/password';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  req: NextRequest
): Promise<NextResponse<APIResponse & { token?: string }>> {
  const {
    email,
    username,
    password,
  }: { email: string; username: string; password: string } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { message: 'Пожалуйста, введите email и пароль', success: false },
      { status: 400 }
    );
  }
  const emailValidationErrors = validateEmail(email);
  const passwordValidationErrors = validatePassword(password);

  if (emailValidationErrors) {
    return NextResponse.json(
      { message: emailValidationErrors, success: false },
      { status: 400 }
    );
  }

  if (passwordValidationErrors) {
    return NextResponse.json(
      { message: passwordValidationErrors, success: false },
      { status: 400 }
    );
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'Пользователь с таким email уже существует', success: false },
        { status: 400 }
      );
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        password_hash: hashedPassword,
      },
    });

    const token = signJWT({
      id: newUser.id,
      name: newUser.username,
    });

    await setTokenCookie(token);

    return NextResponse.json(
      { message: 'Успешная регистрация', success: true, token },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error during sign-up:', error);
    return NextResponse.json(
      { message: 'Ошибка при регистрации', success: false },
      { status: 500 }
    );
  }
}
