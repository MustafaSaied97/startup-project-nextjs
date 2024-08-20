import localeMiddleware from '@/middlewares/localeMiddleware';

export default async function middleware(request) {
  return localeMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
