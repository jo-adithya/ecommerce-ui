'use server';

import { BASE_API_URL } from '@/lib/constants';

type CustomRequestInit = Omit<RequestInit, 'body'> & {
  body: Record<string, any>;
};

type ReturnType =
  | {
      ok: true;
      body: any;
    }
  | {
      ok: false;
      error: any;
    };

export async function _fetch(
  url: string | URL,
  { body, ...init }: CustomRequestInit
): Promise<ReturnType> {
  const _url = new URL(url, BASE_API_URL);
  const headers = new Headers({
    'Content-Type': 'application/json',
    ...init.headers,
  });

  console.log(_url.toString());

  const response = await fetch(_url, {
    ...init,
    headers,
    body: JSON.stringify(body),
  });
  const responseBody = await response.json();

  if (!response.ok) {
    return { ok: false, error: responseBody };
  }
  return { ok: true, body: responseBody };
}
