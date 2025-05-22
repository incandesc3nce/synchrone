import { APIResponse } from '@/types/auth/APIResponse';

/**
 * Client-side API fetch wrapper function.
 */
export const ClientFetch = async <T extends APIResponse>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const json = await response.json();
    throw new Error(json.message);
  }

  const data = await response.json();

  return data as T;
};
