/**
 * Client-side API fetch wrapper function.
 */
export const ClientFetch = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
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
