import { TokenPayload } from '@/types/auth/TokenPayload';
import { cookies } from 'next/headers';
import { verifyJWT } from './jwt';
import { NextRequest } from 'next/server';

export const setTokenCookie = async (token: string) => {
  const cookie = await cookies();

  cookie.set('token', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
    path: '/',
  });
};

export const deleteTokenCookie = async () => {
  const cookie = await cookies();

  cookie.delete('token');
};

export const getCurrentToken = async (): Promise<TokenValidationResult> => {
  const token = (await cookies()).get('token')?.value ?? null;

  if (!token) {
    return { token: null, user: null };
  }

  const decoded = verifyJWT(token);
  if (!decoded) {
    return { token: null, user: null };
  }

  const user = decoded as TokenPayload;
  return { token, user };
};

export const getCurrentTokenAPI = async (
  req: NextRequest
): Promise<TokenValidationResult> => {
  const token = req.headers.get('Authorization')?.split(' ')[1] ?? null;

  if (!token) {
    return { token: null, user: null };
  }

  const decoded = verifyJWT(token);
  if (!decoded) {
    return { token: null, user: null };
  }

  const user = decoded as TokenPayload;
  return { token, user };
};

interface TokenValidationResult {
  token: string | null;
  user: TokenPayload | null;
}
