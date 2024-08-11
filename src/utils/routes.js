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
    createStore: {
      path: `/create-store`,
      // role: ['reseller'],
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
    cart: {
      path: '/cart',
      role: ['user', 'reseller'],
    },
    wishlist: {
      path: '/wishlist',
      role: ['user', 'reseller'],
    },
    makeOrder: {
      path: '/make-order',
      role: ['user', 'reseller'],
    },
    orderHistory: {
      path: '/order-history',
      role: ['user', 'reseller'],
    },
    orderDetails: {
      path: '/order-history/:id',
      role: ['user', 'reseller'],
    },
    products: {
      path: `/products/:id`,
      // role: ['user'],
    },
    profile: {
      path: '/profile',
      role: ['user', 'reseller'],
    },
    referrals: {
      path: '/referrals',
      role: ['user', 'reseller'],
    },
    security: {
      path: '/security',
      role: ['user', 'reseller'],
    },
  },
  panel: {
    home: {
      path: '/panel',
      role: ['admin', 'reseller'],
    },
    // dashboard: {
    //   path: '/panel/dashboard',
    //   // role: ['admin', 'reseller'],
    // },
    login: {
      path: `/panel/login`,
      role: null,
    },
    products: {
      path: `/panel/products`,
      role: ['admin', 'reseller'],
    },
    categories: {
      path: `/panel/categories`,
      role: ['admin'],
    },
    subCategories: {
      path: `/panel/categories/:id`,
      role: ['admin'],
    },
    admins: {
      path: `/panel/admins`,
      role: ['admin'],
    },
    resellers: {
      path: `/panel/resellers`,
      role: ['admin'],
    },
    users: {
      path: `/panel/users`,
      role: ['admin', 'reseller'],
    },

    offers: {
      path: `/panel/offers`,
      role: ['admin', 'reseller'],
    },
    store: {
      path: `/panel/store`,
      role: ['admin'],
    },
    myStore: {
      path: `/panel/my-store`,
      role: ['reseller'],
    },

    orders: {
      path: `/panel/orders`,
      role: ['admin', 'reseller'],
    },
    withdrawal: {
      path: `/panel/withdrawal`,
      role: ['admin', 'reseller'],
    },
    feedback: {
      path: `/panel/feedback`,
      role: ['admin', 'reseller'],
    },
    manageWebsite: {
      path: `/panel/manage-website`,
      role: ['admin'],
    },
    customerSupport: {
      path: `/panel/customer-support`,
      role: ['admin', 'reseller'],
    },
    info: {
      path: `/panel/info`,
      role: ['admin', 'reseller'],
    },
  },
  //---- ERROR PAGES ----
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
  //---- success PAGES ----
  success: {
    payment: {
      path: '/success',
      role: null,
    },
  },
  payment: {
    status: {
      path: '/status',
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
