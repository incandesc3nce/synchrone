import jwt from 'jsonwebtoken';

export const signJWT = (payload: { id: string; name: string }) => {
  const secret = process.env.JWT_SECRET as string;
  const token = jwt.sign(payload, secret, {
    expiresIn: '3d',
  });

  return token;
};

export const verifyJWT = (
  token: string | undefined | null
): { id: string; name: string } | null => {
  const secret = process.env.JWT_SECRET as string;

  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, secret);
    return decoded as { id: string; name: string };
  } catch (error) {
    console.error('JWT verification error:', error);
    return null;
  }
};
