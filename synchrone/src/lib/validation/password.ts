import { z } from 'zod';

export const passwordSchema = z
  .string()
  .min(8, {
    message: 'Пароль должен содержать минимум 8 символов',
  })
  .max(32, {
    message: 'Пароль должен содержать максимум 32 символа',
  })
  .regex(/[0-9]/, {
    message: 'Пароль должен содержать хотя бы одну цифру',
  })
  .regex(/[^A-Z]/, {
    message: 'Пароль должен содержать хотя бы одну заглавную букву',
  })
  .regex(/[^a-z]/, {
    message: 'Пароль должен содержать хотя бы одну строчную букву',
  });

export const validatePassword = (password: string) => {
  const result = passwordSchema.safeParse(password);
  if (!result.success) {
    return result.error.format()._errors.join(', ');
  }
  return null;
};
