import { getCurrentTokenAPI } from '@/lib/auth/cookie';
import { hashPassword } from '@/lib/auth/hashing';
import { prisma } from '@/lib/prisma';
import { validateEmail } from '@/lib/validation/email';
import { validatePassword } from '@/lib/validation/password';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest): Promise<NextResponse> {
  const { token, user } = await getCurrentTokenAPI(req);

  if (!token || !user) {
    return NextResponse.json(
      { message: 'Unauthorized', success: false },
      { status: 401 }
    );
  }

  try {
    const userData = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
        id: true,
        email: true,
        username: true,
      },
    });

    if (!userData) {
      return NextResponse.json(
        { message: 'Пользователь не найден', success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { user: userData, message: 'Пользователь найден', success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { message: 'Произошла ошибка при получении пользователя', success: false },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest): Promise<NextResponse> {
  const { token, user } = await getCurrentTokenAPI(req);

  if (!token || !user) {
    return NextResponse.json(
      { message: 'Unauthorized', success: false },
      { status: 401 }
    );
  }

  try {
    const { email, username, password } = await req.json();
    if (!email || !username) {
      return NextResponse.json(
        { message: 'Пожалуйста, заполните все поля', success: false },
        { status: 400 }
      );
    }

    const emailErrors = validateEmail(email);

    if (emailErrors) {
      return NextResponse.json({ message: emailErrors, success: false }, { status: 400 });
    }

    if (password) {
      const passwordErrors = validatePassword(password);
      if (passwordErrors) {
        return NextResponse.json(
          { message: passwordErrors, success: false },
          { status: 400 }
        );
      }
    }

    const passwordHash = password ? await hashPassword(password) : undefined;

    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        email,
        username,
        password_hash: passwordHash,
      },
    });

    if (!updatedUser) {
      return NextResponse.json(
        { message: 'Пользователь не найден', success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { user: updatedUser, message: 'Пользователь обновлён', success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { message: 'Произошла ошибка при обновлении пользователя', success: false },
      { status: 500 }
    );
  }
}
