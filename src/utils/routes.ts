export const ROLES = {
  user: 'user',
  admin: 'admin',
  reseller: 'reseller',
} as const;

const createRoute = (path: string, role: string | null = null) => ({ path, role });

export const ROUTES = {
  website: {
    home: createRoute('/'),
    login: createRoute('/login'),
    signUp: createRoute('/sign-up'),
    forgetPassword: createRoute('/forget-password'),
    resetPassword: createRoute('/reset-password'),
    verification: createRoute('/verification'),
    aboutUs: createRoute('/about-us'),
    contactUs: createRoute('/contact-us'),
    privacyPolicy: createRoute('/privacy-policy'),
    termsOfService: createRoute('/terms-of-service'),
  },
  errors: {
    _404: createRoute('/404'),
    _401: createRoute('/401'),
    _503: createRoute('/503'),
  },
} as const;

type RouteDetails = {
  path: string;
  role: string | null;
};

type RoutesType = typeof ROUTES;
type PathsType = {
  [K in keyof RoutesType]: {
    [R in keyof RoutesType[K]]: string;
  };
};

type RoleMapType = {
  [path: string]: string | null;
};

export const ROUTES_PATH: PathsType = Object.keys(ROUTES).reduce((acc, sectionKey) => {
  const section = ROUTES[sectionKey as keyof RoutesType];
  acc[sectionKey as keyof RoutesType] = Object.keys(section).reduce(
    (sectionAcc, routeKey) => {
      const route = section[routeKey as keyof typeof section] as RouteDetails;
      sectionAcc[routeKey as keyof typeof section] = removeDynamicPart(route.path);
      return sectionAcc;
    },
    {} as Record<string, string>
  );
  return acc;
}, {} as PathsType);

export const ROUTES_ROLE: RoleMapType = Object.keys(ROUTES).reduce((acc, sectionKey) => {
  const section = ROUTES[sectionKey as keyof RoutesType];
  Object.keys(section).forEach((routeKey) => {
    const route = section[routeKey as keyof typeof section] as RouteDetails;
    acc[route.path] = route.role;
  });
  return acc;
}, {} as RoleMapType);

function removeDynamicPart(url: string): string {
  return url.replace(/\/:.*/, '');
}
