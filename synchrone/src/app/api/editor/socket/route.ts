import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const workspaceId = req.nextUrl.searchParams.get('workspace_id');
    const key = req.nextUrl.searchParams.get('key');

    if (!key || key !== process.env.SOCKET_KEY) {
      return NextResponse.json(
        { message: 'Неверный ключ доступа', success: false },
        { status: 403 }
      );
    }

    if (!workspaceId) {
      return NextResponse.json(
        { message: 'Необходим ID проекта', success: false },
        { status: 400 }
      );
    }

    const workspace = await prisma.workspace.findUnique({
      where: { id: workspaceId },
    });

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
  try {
    const key = req.nextUrl.searchParams.get('key');
    if (!key || key !== process.env.SOCKET_KEY) {
      return NextResponse.json(
        { message: 'Неверный ключ доступа', success: false },
        { status: 403 }
      );
    }

    const { workspaceId, content, language } = await req.json();

    const workspace = await prisma.workspace.update({
      where: { id: workspaceId },
      data: {
        content: content || undefined,
        language: language || undefined,
      },
    });

    return NextResponse.json(
      { workspace, message: 'Содержимое проекта обновлено', success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating workspace:', error);
    return NextResponse.json(
      { message: 'Произошла ошибка при обновлении содержимого проекта', success: false },
      { status: 500 }
    );
  }
}
