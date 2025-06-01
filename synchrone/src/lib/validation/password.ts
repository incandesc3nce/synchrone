import { z } from 'zod';

export const passwordSchema = z
  .string()
  .min(8, {
    message: 'Пароль должен быть не менее 8 символов',
  })
  .max(32, {
    message: 'Пароль должен содержать максимум 32 символа',
  })
  .regex(/[0-9]/, {
    message: 'Пароль должен содержать цифры',
  })
  .regex(/[^A-Z]/, {
    message: 'Пароль должен содержать заглавные буквы',
  })
  .regex(/[^a-z]/, {
    message: 'Пароль должен содержать строчные буквы',
  });

export const validatePassword = (password: string) => {
  const result = passwordSchema.safeParse(password);
  if (!result.success) {
    return result.error.format()._errors.join(', ');
  }
  return null;
};
