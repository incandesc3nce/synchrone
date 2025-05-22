import { getCurrentTokenAPI } from '@/lib/auth/cookie';
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { token, user } = await getCurrentTokenAPI(req);

  if (!token || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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
    });

    return NextResponse.json(info, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const { token, user } = await getCurrentTokenAPI(req);

  if (!token || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { name } = await req.json();

    const info = await prisma.workspace.create({
      data: {
        name,
        users: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    return NextResponse.json(info, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const { token, user } = await getCurrentTokenAPI(req);

  if (!token || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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

    return NextResponse.json(info, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const { token, user } = await getCurrentTokenAPI(req);

  if (!token || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await req.json();

    const info = await prisma.workspace.delete({
      where: {
        id,
        users: {
          some: {
            id: user.id,
          },
        },
      },
    });

    return NextResponse.json(info, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
