import { APIResponse } from '@/types/auth/APIResponse';
import { setTokenCookie } from '@/lib/auth/cookie';
import { verifyPassword } from '@/lib/auth/hashing';
import { signJWT } from '@/lib/auth/jwt';
import { prisma } from '@/lib/prisma';
import { validateEmail } from '@/lib/validation/email';
import { NextRequest, NextResponse } from 'next/server';
import { validatePassword } from '@/lib/validation/password';

export async function POST(
  req: NextRequest
): Promise<NextResponse<APIResponse> & { token?: string }> {
  const { email, password }: { email: string; password: string } = await req.json();

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
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: 'Неверный email или пароль', success: false },
        { status: 400 }
      );
    }

    const isValidPassword = await verifyPassword(password, user.password_hash);

    if (!isValidPassword) {
      return NextResponse.json(
        { message: 'Неверный email или пароль', success: false },
        { status: 400 }
      );
    }

    const token = signJWT({
      id: user.id,
      username: user.username,
      email: user.email,
    });

    await setTokenCookie(token);

    return NextResponse.json(
      { message: 'Успешный вход', success: true, token },
      { status: 200 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Ошибка входа', success: false },
      { status: 500 }
    );
  }
}
