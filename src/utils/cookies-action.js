'use server';

import { cookies } from 'next/headers';

export async function setCookies(opt) {
  await cookies().set(opt);
}
export async function deleteCookies(opt) {
  await cookies().delete(opt);
}
export async function getCookies(opt) {
  return cookies().get(opt)?.value;
}
