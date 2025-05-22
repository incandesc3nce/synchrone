import { TokenPayload } from '@/types/auth/TokenPayload';
import jwt from 'jsonwebtoken';

export const signJWT = (payload: TokenPayload) => {
  const secret = process.env.JWT_SECRET as string;
  const token = jwt.sign(payload, secret, {
    expiresIn: '3d',
  });

  return token;
};

export const verifyJWT = (token: string | undefined | null): TokenPayload | null => {
  const secret = process.env.JWT_SECRET as string;

  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, secret);
    return decoded as { id: string; username: string; email: string };
  } catch (error) {
    console.error('JWT verification error:', error);
    return null;
  }
};
