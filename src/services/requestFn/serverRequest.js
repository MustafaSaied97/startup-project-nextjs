import { getCookies } from '@/utils/cookies-action';
import { headers } from 'next/headers';
export async function makeServerRequest({ auth = false, method, url, formData = null, withFiles = false, arrayBufferResponse = false, abortControllerSignal = null }) {
  if (!url || !method) {
    console.error('Both the URL and the method must be provided.');
    return Promise.reject({});
  }
  let AccessTokens = '';
  if (auth) {
    //1- get token from storage

    AccessTokens = JSON.parse((await getCookies('authData')) || '{}')?.token;

    //2- check if it expired or not
    //if not store token in AccessTokens
    //else dont store it
  }
  const headersList = headers();
  const domainName = headersList.get('host') || '';

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`, {
      method: method, // *GET, POST, PUT, DELETE, etc.
      headers: {
        'X-Frontend-Domain': domainName,
        Accept: 'application/json',
        Platform: 'web',
        'Accept-Language': 'ar',
        ...(AccessTokens && { Authorization: `Bearer ${AccessTokens}` }),
      },
      ...(formData && { body: formData }),
      next: { revalidate: 1 * 60 },
    });
    const data = response.json();
    return Promise.resolve(data);
  } catch (err) {
    Promise.reject(err);
  }
}
