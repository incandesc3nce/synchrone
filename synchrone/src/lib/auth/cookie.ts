import { cookies } from 'next/headers';

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
