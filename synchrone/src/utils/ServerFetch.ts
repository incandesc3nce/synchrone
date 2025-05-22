import { cookies } from 'next/headers';

/**
 * Serverside fetch wrapper function.
 */
export const ServerFetch = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const token = (await cookies()).get('token')?.value ?? null;
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
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
