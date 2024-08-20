import { NextRequest, NextResponse } from 'next/server';
import { ROUTES_PATH, ROUTES_ROLE, isTokenValid } from '@/utils';
const websiteAuthPaths = [ROUTES_PATH.website.login, ROUTES_PATH.website.signUp, ROUTES_PATH.website.forgetPassword, ROUTES_PATH.website.resetPassword, ROUTES_PATH.website.verification];

export default function authMiddleware(request, response) {
  let { pathname } = request.nextUrl;
  pathname = removeLanguagePrefix(pathname);

  const lang = request.cookies.get('NEXT_LOCALE')?.value || 'en';
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
      const loginPath = matchedRoute.split('/').includes('panel') ? `/${lang}${ROUTES_PATH.panel.login}` : `/${lang}${ROUTES_PATH.website.login}`;
      return NextResponse.redirect(new URL(loginPath, request.url));
    }

    if (!ROUTES_ROLE[matchedRoute].includes(role)) {
      const notMatchedRolePath = role === 'user' ? `/${lang}${ROUTES_PATH.website.home}` : `/${lang}${ROUTES_PATH.panel.home}`;
      return NextResponse.redirect(new URL(notMatchedRolePath, request.url));
    }

    return response;
  }

  if (websiteAuthPaths.includes(matchedRoute) && isAuthenticated && isMemberInWebsite) {
    const notMatchedRolePath = `/${lang}${ROUTES_PATH.website.home}`;
    return NextResponse.redirect(new URL(notMatchedRolePath, request.url));
  }


  return response;
}
function removeLanguagePrefix(str) {
  // Remove /ar or /en from the beginning of the string
  return str.replace(/^\/(ar|en)(\/|$)/, '/');
}
