import { getCurrentTokenAPI } from '@/lib/auth/cookie';
import { prisma } from '@/lib/prisma';
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
    const workspaceId = req.nextUrl.searchParams.get('workspace_id');

    if (!workspaceId) {
      return NextResponse.json(
        { message: 'Необходим ID проекта', success: false },
        { status: 400 }
      );
    }

    // check if user is part of the workspace
    const workspace = await prisma.workspace.findUnique({
      where: { id: workspaceId },
      include: {
        users: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    });

    if (!workspace || !workspace.users.some((u) => u.id === user.id)) {
      return NextResponse.json(
        { message: 'Вы не являетесь частью этого проекта', success: false },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { workspace, message: 'Получена информация о проекте', success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching workspace:', error);
    return NextResponse.json(
      { message: 'Произошла ошибка при получении информации о проекте', success: false },
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
    const { workspaceId, language, content } = await req.json();

    const workspace = await prisma.workspace.findUnique({
      where: { id: workspaceId },
      include: {
        users: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    });

    if (!workspace || !workspace.users.some((u) => u.id === user.id)) {
      return NextResponse.json(
        { message: 'Вы не являетесь частью этого проекта', success: false },
        { status: 403 }
      );
    }

    const updatedWorkspace = await prisma.workspace.update({
      where: { id: workspaceId },
      data: {
        language: language || undefined,
        content: content || undefined,
      },
    });

    return NextResponse.json(
      {
        workspace: updatedWorkspace,
        message: 'Проект успешно обновлён',
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating workspace:', error);
    return NextResponse.json(
      { message: 'Произошла ошибка при обновлении проекта', success: false },
      { status: 500 }
    );
  }
}
