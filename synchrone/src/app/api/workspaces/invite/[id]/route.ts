import { getCurrentTokenAPI } from '@/lib/auth/cookie';
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest): Promise<NextResponse> {
  const { token, user } = await getCurrentTokenAPI(req);

  if (!token || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const workspaceId = req.nextUrl.pathname.split('/').pop();
    if (!workspaceId) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
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
      return NextResponse.json({ error: 'Workspace not found' }, { status: 404 });
    }

    const userInWorkspace = workspace.users.find((u) => u.id === user.id);

    if (userInWorkspace) {
      return NextResponse.json({ error: 'User already in workspace' }, { status: 400 });
    }

    // check if invite link exists
    const inviteLink = await prisma.workspaceInvite.findFirst({
      where: {
        workspaceId,
      },
    });

    if (!inviteLink) {
      return NextResponse.json({ error: 'Invite link not found' }, { status: 404 });
    }

    // check if invite link is expired
    if (inviteLink.expiresAt < new Date()) {
      return NextResponse.json({ error: 'Invite link expired' }, { status: 400 });
    }

    // add user to workspace
    await prisma.workspace.update({
      where: {
        id: workspaceId,
      },
      data: {
        users: {
          connect: {
            id: user.id,
          },
        },
      },
    });
    
    return NextResponse.json(
      { message: 'User added to workspace successfully', success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing invite request:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { token, user } = await getCurrentTokenAPI(req);

  if (!token || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { workspaceId } = await req.json();

    if (!workspaceId) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    // check if workspace belongs to user

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
      return NextResponse.json({ error: 'Workspace not found' }, { status: 404 });
    }

    const userInWorkspace = workspace.users.find((u) => u.id === user.id);

    const isOwner = workspace.ownerId === user.id;

    if (!userInWorkspace && !isOwner) {
      return NextResponse.json({ error: 'User not found in workspace' }, { status: 404 });
    }

    // create invite link
    const inviteLink = await prisma.workspaceInvite.create({
      data: {
        workspaceId,
        expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour expiration
      },
    });

    return NextResponse.json(
      { inviteLink, message: 'Invite link created successfully', success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing invite request:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
