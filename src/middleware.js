import authMiddleware from '@/middlewares/authMiddleware';
import { NextResponse } from 'next/server';

export default async function middleware(request) {
  const response = NextResponse.next()
  return authMiddleware(request, response);
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
