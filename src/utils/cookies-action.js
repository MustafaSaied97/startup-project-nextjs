'use server';

import { cookies } from 'next/headers';

export async function setCookies(opt) {
  // opt={
  //   name: 'token',
  //   // value:
  //   value: token,
  //   // httpOnly: true, // so you cant get edit it in browser dev tool
  //   maxAge: 10000000000, //((in seconds)) //Indicates the number of seconds until the cookie expires. A zero or negative number will expire the cookie immediately. If both Expires and Max-Age are set, Max-Age has precedence
  //   // expires: Date.now() - oneDay(in mile seconds),// the spefice time wil cookies end
  //   // secure: true, // so you cant get it in any page
  // }
  await cookies().set(opt);
}
export async function deleteCookies(opt) {
  await cookies().delete(opt);
}
export async function getCookies(opt) {
  return cookies().get(opt)?.value;
}
