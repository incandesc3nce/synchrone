import { cookies } from "next/headers";

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
    const errorText = await response.text();
    throw new Error(`Error: ${response.status} ${errorText}`);
  }

  const data = await response.json();
  if (data.error) {
    throw new Error(`Error: ${data.error}`);
  }

  return data as T;
} 