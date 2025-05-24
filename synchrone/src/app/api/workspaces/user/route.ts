import { getCurrentTokenAPI } from '@/lib/auth/cookie';
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  const { token, user } = await getCurrentTokenAPI(req);

  if (!token || !user) {
    return NextResponse.json(
      { message: 'Unauthorized', success: false },
      { status: 401 }
    );
  }

  try {
    const { userId, workspaceId } = await req.json();

    if (!userId || !workspaceId) {
      return NextResponse.json(
        { message: 'Пожалуйста, заполните все поля', success: false },
        { status: 400 }
      );
    }

    const workspace = await prisma.workspace.findUnique({
      where: {
        id: workspaceId,
      },
      include: {
        users: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!workspace) {
      return NextResponse.json(
        { message: 'Проект не найден', success: false },
        { status: 404 }
      );
    }

    const userInWorkspace = workspace.users.find((u) => u.id === userId);

    if (!userInWorkspace) {
      return NextResponse.json(
        { message: 'Пользователь не найден в проекте', success: false },
        { status: 404 }
      );
    }

    await prisma.workspace.update({
      where: {
        id: workspaceId,
      },
      data: {
        users: {
          disconnect: {
            id: userId,
          },
        },
      },
    });

    return NextResponse.json(
      { message: 'Пользователь успешно удален из проекта', success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error removing user from workspace:', error);
    return NextResponse.json(
      {
        message: 'Произошла ошибка при удалении пользователя из проекта',
        success: false,
      },
      { status: 500 }
    );
  }
}
