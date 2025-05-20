/**
 * Client-side API fetch wrapper function.
 */
export const APIFetch = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const token = typeof window !== 'undefined'
    ? document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1]
    : undefined;

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
};
