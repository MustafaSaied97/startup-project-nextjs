import { getCookies } from '@/utils/cookies-action';
import { headers } from 'next/headers';
type MakeServerRequestParams = {
  auth?: boolean; // Optional
  method: string;
  url: string;
  formData?: Record<string, any>; // Allow any shape for formData
  withFiles?: boolean;
  arrayBufferResponse?: boolean;
  abortControllerSignal?: AbortSignal | null;
  [key: string]: any; // Allow additional parameters
};

export async function makeServerRequest({
  auth = false,
  method,
  url,
  formData = {},
  withFiles = false,
  arrayBufferResponse = false,
  abortControllerSignal = null,
}: MakeServerRequestParams): Promise<any> {
  if (!url || !method) {
    console.error('Both the URL and the method must be provided.');
    return Promise.reject({});
  }
  let AccessTokens = '';
  if (auth) {
    //1- get token from storage

    AccessTokens = JSON.parse((await getCookies('authData')) || '{}')?.token || '';

    //2- check if it expired or not
    //if not store token in AccessTokens
    //else dont store it
  }
  const headersList = headers();
  const domainName = headersList.get('host') || '';

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`, {
      method, // *GET, POST, PUT, DELETE, etc.
      headers: {
        'X-Frontend-Domain': domainName,
        Accept: 'application/json',
        Platform: 'web',
        'Accept-Language': 'ar',
        ...(AccessTokens && { Authorization: `Bearer ${AccessTokens}` }),
      },
      ...(formData && { body: JSON.stringify(formData) }),
      next: { revalidate: 1 * 60 },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`); // Handle HTTP errors
    }
    const data = await response.json();
    return Promise.resolve(data);
  } catch (err) {
    Promise.reject(err);
  }
}
