import { getCurrentTokenAPI } from '@/lib/auth/cookie';
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { token, user } = await getCurrentTokenAPI(req);

  if (!token || !user) {
    return NextResponse.json(
      { message: 'Unauthorized', success: false },
      { status: 401 }
    );
  }

  try {
    const info = await prisma.workspace.findMany({
      where: {
        users: {
          some: {
            id: user.id,
          },
        },
      },
      include: {
        owner: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
        users: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(
      { projects: info, message: 'Получены проекты', success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { message: 'Произошла ошибка при получении проектов', success: false },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const { token, user } = await getCurrentTokenAPI(req);

  if (!token || !user) {
    return NextResponse.json(
      { message: 'Unauthorized', success: false },
      { status: 401 }
    );
  }

  try {
    const { name } = await req.json();

    const info = await prisma.workspace.create({
      data: {
        name,
        ownerId: user.id,
        users: {
          connect: {
            id: user.id,
          },
        },
      },
      include: {
        users: {
          select: {
            username: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(
      { project: info, message: 'Успешно создан проект!', success: true },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { message: 'Произошла ошибка при создании проекта', success: false },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  const { token, user } = await getCurrentTokenAPI(req);

  if (!token || !user) {
    return NextResponse.json(
      { message: 'Unauthorized', success: false },
      { status: 401 }
    );
  }

  try {
    const { id, name } = await req.json();

    const info = await prisma.workspace.update({
      where: {
        id,
        users: {
          some: {
            id: user.id,
          },
        },
      },
      data: {
        name,
      },
    });

    return NextResponse.json(
      { project: info, message: 'Успешно обновлен проект!', success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json(
      { message: 'Произошла ошибка при обновлении проекта', success: false },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const { token, user } = await getCurrentTokenAPI(req);

  if (!token || !user) {
    return NextResponse.json(
      { message: 'Unauthorized', success: false },
      { status: 401 }
    );
  }

  try {
    const { id } = await req.json();

    await prisma.file.deleteMany({
      where: {
        workspaceId: id,
      },
    });

    await prisma.workspace.delete({
      where: {
        id,
        users: {
          some: {
            id: user.id,
          },
        },
      },
    });

    return NextResponse.json(
      { message: 'Проект успешно удален!', success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { message: 'Произошла ошибка при удалении проекта', success: false },
      { status: 500 }
    );
  }
}
