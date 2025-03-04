import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const info = await prisma.workspace.findMany();

    return NextResponse.json(info);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name } = await req.json();

    const info = await prisma.workspace.create({
      data: {
        name,
      },
    });

    return NextResponse.json(info, {status: 201});
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, name } = await req.json();

    const info = await prisma.workspace.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(info);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const {id} = await req.json();

    const info = await prisma.workspace.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(info);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
