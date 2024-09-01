import { NextResponse } from 'next/server';
import { ROUTES_PATH, ROUTES_ROLE, isTokenValid } from '@/utils';

const websiteAuthPaths = [
  ROUTES_PATH.auth.login,
  ROUTES_PATH.auth.signUp,
  ROUTES_PATH.auth.forgetPassword,
  ROUTES_PATH.auth.resetPassword,
  ROUTES_PATH.auth.verification,
];

export default function authMiddleware(request, response) {
  const { pathname } = request.nextUrl;
  const { token, role, isMemberInWebsite } = JSON.parse(request.cookies.get('authData')?.value || '{}');
  const isAuthenticated = role && token;

  const matchedRoute = Object.keys(ROUTES_ROLE).find((path) => {
    const regexPattern = path.replace(/:\w+/g, '[^/]+');
    const regex = new RegExp(`^${regexPattern}$`);
    return regex.test(pathname);
  });

  if (ROUTES_ROLE[matchedRoute]) {
    if (!isAuthenticated) {
      // Delete token and role
      response.cookies.delete({ name: 'authData' });
      // Redirect to login
      const loginPath = ROUTES_PATH.auth.login;
      return NextResponse.redirect(new URL(loginPath, request.url));
    }

    if (!ROUTES_ROLE[matchedRoute].includes(role)) {
      const notMatchedRolePath = ROUTES_PATH.website.home;
      return NextResponse.redirect(new URL(notMatchedRolePath, request.url));
    }

    return response;
  }

  if (websiteAuthPaths.includes(matchedRoute) && isAuthenticated && isMemberInWebsite) {
    const notMatchedRolePath = ROUTES_PATH.website.home;
    return NextResponse.redirect(new URL(notMatchedRolePath, request.url));
  }

  return response;
}
