import { hash, verify } from 'argon2';

export const hashPassword = async (password: string): Promise<string> => {
  const secret = process.env.HASH_SECRET as string;

  try {
    const hashedPassword = await hash(password, {
      secret: Buffer.from(secret),
    });
    return hashedPassword;
  } catch (error) {
    console.error('Error hashing password:', error);
    throw new Error('Failed to hash password');
  }
};

export const verifyPassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  const secret = process.env.HASH_SECRET as string;

  try {
    const isValid = await verify(hashedPassword, password, {
      secret: Buffer.from(secret),
    });
    return isValid;
  } catch (error) {
    console.error('Error verifying password:', error);
    throw new Error('Failed to verify password');
  }
};
