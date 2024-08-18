export const ROLES = {
  user: 'user',
  admin: 'admin',
  reseller: 'reseller',
};


export const ROUTES = Object.freeze({
  website: {
    home: {
      path: '/',
      role: null,
    },
    login: {
      path: `/login`,
      role: null,
    },
    signUp: {
      path: `/sign-up`,
      role: null,
    },
    forgetPassword: {
      path: `/forget-password`,
      role: null,
    },
    resetPassword: {
      path: `/reset-password`,
      role: null,
    },
    verification: {
      path: `/verification`,
      role: null,
    },
    aboutUs: {
      path: `/about-us`,
      role: null,
    },
    contactUs: {
      path: `/contact-us`,
      role: null,
    },
    privacyPolicy: {
      path: `/privacy-policy`,
      role: null,
    },
    termsOfService: {
      path: `/terms-of-service`,
      role: null,
    },
  },
  errors: {
    _404: {
      path: `/404`,
      role: null,
    },
    _401: {
      path: `/401`,
      role: null,
    },
    _503: {
      path: `/503`,
      role: null,
    },
  },
});

export const ROUTES_PATH = {};
for (const routeKey in ROUTES) {
  const routeSection = ROUTES[routeKey];
  ROUTES_PATH[routeKey] = {};
  for (const routeSectionKey in routeSection) {
    ROUTES_PATH[routeKey][routeSectionKey] = removeDynamicPart(routeSection[routeSectionKey].path);
  }
}

export const ROUTES_ROLE = {};
for (const routeKey in ROUTES) {
  const routeSection = ROUTES[routeKey];
  for (const routeSectionKey in routeSection) {
    const pathValue = routeSection[routeSectionKey].path;
    const roleValue = routeSection[routeSectionKey].role;
    ROUTES_ROLE[pathValue] = roleValue;
  }
}
function removeDynamicPart(url) {
  // Define a regular expression pattern to match anything after "/:"
  const dynamicRoutePattern = /\/:.*/;
  // Replace anything after "/:" with an empty string
  const replacedUrl = url.replace(dynamicRoutePattern, '');
  return replacedUrl;
}
