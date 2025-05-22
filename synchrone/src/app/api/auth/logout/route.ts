import { deleteTokenCookie } from '@/lib/auth/cookie';
import { APIResponse } from '@/types/common/APIResponse';
import { NextResponse } from 'next/server';

export async function POST(): Promise<NextResponse<APIResponse>> {
  await deleteTokenCookie();

  return NextResponse.json(
    {
      message: 'Logout successful',
      success: true,
    },
    {
      status: 200,
    }
  );
}
