import { z } from 'zod';

export const emailSchema = z.string().email({
  message: 'Email должен быть верным',
});
export const validateEmail = (email: string) => {
  const result = emailSchema.safeParse(email);
  if (!result.success) {
    return result.error.format()._errors.join(', ');
  }
  return null;
};
