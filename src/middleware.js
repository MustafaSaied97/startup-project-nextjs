import authMiddleware from '@/middlewares/authMiddleware';
import localeMiddleware from '@/middlewares/localeMiddleware';

export default async function middleware(request) {
  const response = localeMiddleware(request);
  //like:
  // const response = NextResponse.next();
  // response.cookies.set({ name: 'slug', value: 'fast3', path: '/' });

  return authMiddleware(request, response);
}

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
