import authMiddleware from '@/middlewares/authMiddleware';
import localeMiddleware from '@/middlewares/localeMiddleware';

export default async function middleware(request) {
  const response = localeMiddleware(request);
  return authMiddleware(request, response);
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
