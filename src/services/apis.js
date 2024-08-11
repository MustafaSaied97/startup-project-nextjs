import { withAxios } from './requestFn/clientRequest';
import { objectToQueryString } from '@/utils';

export const websiteApis = {
  getHome: (options = {}) => {
    return withAxios({ url: `/api/home${objectToQueryString(options)}`, method: 'GET' });
  },
  getGroups: (options = {}) => {
    return withAxios({ url: `/api/groups${objectToQueryString(options)}`, method: 'GET' });
  },
  getProducts: (options = {}) => {
    return withAxios({ url: `/api/products${objectToQueryString(options, { isEncoded: false })}`, method: 'GET' });
  },

  getCategories: () => {
    return withAxios({ url: `/api/categories`, method: 'GET' });
  },
  getCountries: () => {
    return withAxios({ url: `/api/countries`, method: 'GET' });
  },
  addProduct: () => {
    return withAxios({ url: `/api/new-home`, method: 'POST' });
  },
  signUp: (payload = {}) => {
    return withAxios({ url: `/api/register`, method: 'POST', formData: payload }).then((res) => (res?.status ? res : Promise.reject(res)));
  },
  verify: (payload = {}) => {
    return withAxios({ url: `/api/verify`, method: 'POST', formData: payload }).then((res) => (res?.status ? res : Promise.reject(res)));
  },
  login: (payload = {}) => {
    return withAxios({ url: `/api/login`, method: 'POST', formData: payload }).then((res) => (res?.status ? res : Promise.reject(res)));
  },
  createStore: (payload = {}) => {
    return withAxios({ url: `/api/panel/stores`, method: 'POST', formData: payload, auth: true, withFiles: true }).then((res) => (res?.status ? res : Promise.reject(res)));
  },
  updateProfile: (payload = {}) => {
    return withAxios({ url: `/api/profile`, method: 'PUT', formData: payload, auth: true }).then((res) => (res?.status ? res : Promise.reject(res)));
  },
  changePassword: (payload = {}) => {
    return withAxios({ url: `/api/change-password`, method: 'POST', formData: payload, auth: true }).then((res) => (res?.status ? res : Promise.reject(res)));
  },
  forgotPassword: (payload = {}) => {
    return withAxios({ url: `/api/forgot-password`, method: 'POST', formData: payload }).then((res) => (res?.status ? res : Promise.reject(res)));
  },
  resetPassword: (payload = {}) => {
    return withAxios({ url: `/api/reset-password`, method: 'POST', formData: payload }).then((res) => (res?.status ? res : Promise.reject(res)));
  },
  logout: () => {
    return withAxios({ url: `/api/logout`, method: 'POST', auth: true })
      .then((res) => (res?.status ? res : Promise.reject(res)))
      .catch((err) => Promise.reject(err.data));
  },
  addToCart: (payload = {}) => {
    return withAxios({ url: `/api/cart`, method: 'POST', auth: true, formData: payload }).then((res) => (res?.status ? res : Promise.reject(res)));
  },
  getCart: () => {
    return withAxios({ url: `/api/cart`, method: 'GET', auth: true }).then((res) => (res?.status ? res : Promise.reject(res)));
  },
  removeFromCart: (productId) => {
    return withAxios({ url: `/api/cart/${productId}`, method: 'DELETE', auth: true }).then((res) => (res?.status ? res : Promise.reject(res)));
  },
  updateCartQuantity: (productId, payload = {}) => {
    return withAxios({ url: `/api/cart/${productId}`, method: 'PUT', auth: true, formData: payload }).then((res) => (res?.status ? res : Promise.reject(res)));
  },
  getWishlist: () => {
    return withAxios({ url: `/api/favorites`, method: 'GET', auth: true }).then((res) => (res?.status ? res : Promise.reject(res)));
  },
  getAllWishlistIds: () => {
    return withAxios({ url: `/api/favorites/ids`, method: 'GET', auth: true }).then((res) => (res?.status ? res : Promise.reject(res)));
  },
  addToWishlist: (payload = {}) => {
    return withAxios({ url: `/api/favorites`, method: 'POST', auth: true, formData: payload }).then((res) => (res?.status ? res : Promise.reject(res)));
  },
  removeFromWishlist: (productId) => {
    return withAxios({ url: `/api/favorites/${productId}`, method: 'DELETE', auth: true }).then((res) => (res?.status ? res : Promise.reject(res)));
  },
  makeOrderForCart: (payload = {}) => {
    return withAxios({ url: `/api/cart/place-order`, method: 'POST', auth: true, formData: payload }).then((res) => (res?.status ? res : Promise.reject(res)));
  },
  makeOrderForProduct: (payload = {}) => {
    return withAxios({ url: `/api/orders`, method: 'POST', auth: true, formData: payload }).then((res) => (res?.status ? res : Promise.reject(res)));
  },
  addRatings: (payload = {}) => {
    return withAxios({ url: `/api/ratings`, method: 'POST', auth: true, formData: payload }).then((res) => (res?.status ? res : Promise.reject(res)));
  },
  getRatings: (options = {}) => {
    return withAxios({ url: `/api/ratings${objectToQueryString(options)}`, method: 'GET' }).then((res) => (res?.status ? res : Promise.reject(res)));
  },
  sendContactUs: (payload = {}) => {
    return withAxios({ url: `/api/contact-us`, method: 'POST', formData: payload }).then((res) => (res?.status ? res : Promise.reject(res)));
  },
  getTickects: (uid) => {
    return withAxios({ url: `/api/tickets?uid=${uid}`, method: 'GET' }).then((res) => (res?.status ? res : Promise.reject(res)));
  },
  getAboutUs: () => {
    return withAxios({ url: `/api/about-us`, method: 'GET' }).then((res) => (res?.status ? res : Promise.reject(res)));
  },
  getTermsOfUse: () => {
    return withAxios({ url: `/api/terms`, method: 'GET' }).then((res) => (res?.status ? res : Promise.reject(res)));
  },
  getPrivacyPolicy: () => {
    return withAxios({ url: `/api/privacy-policy`, method: 'GET' }).then((res) => (res?.status ? res : Promise.reject(res)));
  },
  getContactUs: () => {
    return withAxios({ url: `/api/contact-us`, method: 'GET' }).then((res) => (res?.status ? res : Promise.reject(res)));
  },
  getOrders: (options = {}) => {
    return withAxios({ url: `/api/orders${objectToQueryString(options)}`, method: 'GET', auth: true }).then((res) => (res?.status ? res : Promise.reject(res)));
  },
  getOrdersStatistics: () => {
    return withAxios({ url: `/api/orders/statistics`, method: 'GET', auth: true }).then((res) => (res?.status ? res : Promise.reject(res)));
  },
  cancelOrder: (payload = {}) => {
    return withAxios({ url: `/api/orders/cancel`, method: 'POST', auth: true, formData: payload }).then((res) => (res?.status ? res : Promise.reject(res)));
  },
  getReferrals: (payload = {}) => {
    return withAxios({ url: `/api/referrals`, method: 'GET', auth: true }).then((res) => (res?.status ? res : Promise.reject(res)));
  },
  getReferralsMembers: (options = {}) => {
    return withAxios({ url: `/api/referrals/members${objectToQueryString(options, { isEncoded: false })}`, method: 'GET', auth: true }).then((res) => (res?.status ? res : Promise.reject(res)));
  },
};

export const panelApis = {
  getWebsiteSettings: () => {
    return withAxios({ url: `/api/panel/settings`, method: 'GET', auth: true });
  },
  updateWebsiteSettings: (payload = {}) => {
    return withAxios({ url: `/api/panel/settings`, method: 'POST', auth: true, formData: payload });
  },

  getAdmins: () => {
    return withAxios({ url: `/api/panel/admins`, method: 'GET', auth: true });
  },
  addAdmin: (payload = {}) => {
    return withAxios({ url: `/api/panel/admins`, method: 'POST', auth: true, formData: payload });
  },
  editAdmin: (payload = {}, id) => {
    return withAxios({ url: `/api/panel/admins/${id}`, method: 'PUT', auth: true, formData: payload });
  },
  deleteAdmin: (payload = {}, id) => {
    return withAxios({ url: `/api/panel/admins/${id}`, method: 'DELETE', auth: true, formData: payload });
  },
  getAllResellers: () => {
    return withAxios({ url: `/api/panel/resellers?pagination=0`, method: 'GET', auth: true });
  },
  getResellers: (options) => {
    return withAxios({ url: `/api/panel/resellers${objectToQueryString(options, { isEncoded: false })}`, method: 'GET', auth: true });
  },
  addReseller: (payload = {}) => {
    return withAxios({ url: `/api/panel/resellers`, method: 'POST', auth: true, formData: payload });
  },
  editReseller: (payload = {}, id) => {
    return withAxios({ url: `/api/panel/resellers/${id}`, method: 'PUT', auth: true, formData: payload });
  },
  deleteReseller: (payload = {}, id) => {
    return withAxios({ url: `/api/panel/resellers/${id}`, method: 'DELETE', auth: true, formData: payload });
  },
  getUsers: (options) => {
    return withAxios({ url: `/api/panel/users${objectToQueryString(options, { isEncoded: false })}`, method: 'GET', auth: true });
  },
  addUser: (payload = {}) => {
    return withAxios({ url: `/api/panel/users`, method: 'POST', auth: true, formData: payload });
  },
  editUser: (payload = {}, id) => {
    return withAxios({ url: `/api/panel/users/${id}`, method: 'PUT', auth: true, formData: payload });
  },
  deleteUser: (payload = {}, id) => {
    return withAxios({ url: `/api/panel/users/${id}`, method: 'DELETE', auth: true, formData: payload });
  },
  getWishList: (id) => {
    return withAxios({ url: `api/panel/users/${id}/favorites`, method: 'GET', auth: true });
  },
  getDashBoard: () => {
    return withAxios({ url: `api/panel/index`, method: 'GET', auth: true }).then((res) => (res?.status ? res : Promise.reject(res)));
  },
  getCategories: (options) => {
    return withAxios({ url: `api/panel/categories${objectToQueryString(options, { isEncoded: false })}`, method: 'GET', auth: true }).then((res) => (res?.status ? res : Promise.reject(res)));
  },
  addCategories: (payload = {}) => {
    return withAxios({ url: `api/panel/categories`, method: 'POST', auth: true, formData: payload }).then((res) => (res?.status ? res : Promise.reject(res)));
  },
  editCategories: (payload = {}, id) => {
    return withAxios({ url: `api/panel/categories/${id}`, method: 'PUT', auth: true, formData: payload }).then((res) => (res?.status ? res : Promise.reject(res)));
  },
  deleteCategories: (id) => {
    return withAxios({ url: `/api/panel/categories/${id}`, auth: true, method: 'DELETE' });
  },
  getSubCategories: (options, mainCategoryId) => {
    return withAxios({ url: `api/panel/categories/${mainCategoryId}${objectToQueryString(options, { isEncoded: false })}`, method: 'GET', auth: true }).then((res) =>
      res?.status ? res : Promise.reject(res)
    );
  },
  addSubCategories: (payload = {}) => {
    return withAxios({ url: `api/panel/categories`, method: 'POST', auth: true, formData: payload }).then((res) => (res?.status ? res : Promise.reject(res)));
  },
  editSubCategories: (payload = {}, id) => {
    return withAxios({ url: `api/panel/categories/${id}`, method: 'PUT', auth: true, formData: payload }).then((res) => (res?.status ? res : Promise.reject(res)));
  },
  deleteSubCategories: (id) => {
    return withAxios({ url: `/api/panel/categories/${id}`, auth: true, method: 'DELETE' });
  },

  getOffers: () => {
    return withAxios({ url: `/api/panel/offers`, method: 'GET', auth: true });
  },
  addOffer: (payload = {}) => {
    return withAxios({ url: `/api/panel/offers`, method: 'POST', auth: true, formData: payload, withFiles: true });
  },
  editOffer: (payload = {}, id) => {
    return withAxios({ url: `/api/panel/offers/${id}`, method: 'POST', auth: true, formData: payload, withFiles: true });
  },
  deleteOffer: (payload = {}, id) => {
    return withAxios({ url: `/api/panel/offers/${id}`, method: 'DELETE', auth: true, formData: payload });
  },

  getProducts: (options) => {
    return withAxios({ url: `/api/panel/products${objectToQueryString(options, { isEncoded: false })}`, method: 'GET', auth: true });
  },
  addProduct: (payload = {}) => {
    return withAxios({ url: `/api/panel/products`, method: 'POST', auth: true, formData: payload, withFiles: true });
  },
  editProduct: (payload = {}, id) => {
    return withAxios({ url: `/api/panel/products/${id}`, method: 'PUT', auth: true, formData: payload });
  },
  deleteProduct: (payload = {}, id) => {
    return withAxios({ url: `/api/panel/products/${id}`, method: 'DELETE', auth: true, formData: payload });
  },

  deleteProductImage: (id) => {
    return withAxios({ url: `/api/panel/products/images/${id}`, method: 'DELETE', auth: true });
  },
  addProductImage: (payload = {}) => {
    return withAxios({ url: `/api/panel/products/images`, method: 'POST', auth: true, formData: payload, withFiles: true });
  },

  exportProductFile: () => {
    return withAxios({ url: `/api/panel/products/export`, method: 'GET', auth: true, arrayBufferResponse: true });
  },

  importProductFile: (payload = {}) => {
    return withAxios({ url: `/api/panel/products/import`, method: 'POST', auth: true, formData: payload, withFiles: true });
  },

  getMainCategoriesUnPaginated: () => {
    return withAxios({ url: `/api/panel/categories?pagination=0`, method: 'GET', auth: true });
  },

  getSubCategoriesUnPaginated: (id) => {
    return withAxios({ url: `/api/panel/categories/${id}?pagination=0`, method: 'GET', auth: true });
  },

  // getStores: () => {
  //   return withAxios({ url: `/api/panel/stores`, method: 'GET', auth: true });
  // },

  getProfile: () => {
    return withAxios({ url: `/api/profile`, method: 'GET', auth: true });
  },

  editProfile: (payload = {}) => {
    return withAxios({ url: `/api/profile`, method: 'PUT', auth: true, formData: payload });
  },



  changePassword: (payload = {}) => {
    return withAxios({ url: `/api/change-password`, method: 'POST', auth: true, formData: payload });
  },

  getRatings: (options, id) => {
    return withAxios({ url: `/api/panel/products/ratings${objectToQueryString(options, { isEncoded: false })}`, method: 'GET', auth: true });
  },
  deleteRating: (id) => {
    return withAxios({ url: `/api/panel/products/ratings/${id}`, method: 'DELETE', auth: true });
  },

  getOrders: (options) => {
    return withAxios({ url: `/api/panel/orders${objectToQueryString(options, { isEncoded: false })}`, method: 'GET', auth: true });
  },
  deleteOrder: (id) => {
    return withAxios({ url: `/api/panel/orders/${id}`, method: 'DELETE', auth: true });
  },
  changeOrder: (id, payload) => {
    return withAxios({ url: `/api/panel/orders/${id}`, method: 'PUT', auth: true, formData: payload });
  },

  getAllStores: () => {
    return withAxios({ url: `/api/panel/stores?pagination=0`, method: 'GET', auth: true });
  },


  getStores:(options = {}) => {
    return withAxios({ url: `/api/panel/stores${objectToQueryString(options, { isEncoded: false })}`, method: 'GET', auth: true });
  },
  addStore: (payload = {}) => {
    return withAxios({ url: `/api/panel/stores`, method: 'POST', auth: true, formData: payload, withFiles: true });
  },
  editStore: (payload = {}, id) => {
    return withAxios({ url: `/api/panel/stores/${id}`, method: 'POST', auth: true, formData: payload, withFiles: true });
  },
  deleteStore: (payload = {}, id) => {
    return withAxios({ url: `/api/panel/stores/${id}`, method: 'DELETE', auth: true, formData: payload });
  },


  getAllProducts:() => {
    return withAxios({ url: `/api/panel/products/website`, method: 'GET', auth: true });
  },

  getSuggestedPrice:(id) => {
    return withAxios({ url: `/api/panel/products/${id}/suggested-price`, method: 'GET', auth: true });
  },

  addResllerProduct: (payload = {}) => {
    return withAxios({ url: `/api/panel/products/select`, method: 'POST', auth: true, formData: payload, withFiles: true });
  },



  getWithdrawals:(options = {}) => {
    return withAxios({ url: `/api/panel/withdrawals${objectToQueryString(options, { isEncoded: false })}`, method: 'GET', auth: true });
  },
  addWithdrawal: (payload = {}) => {
    return withAxios({ url: `/api/panel/withdrawals`, method: 'POST', auth: true, formData: payload});
  },
  updateWithdrawal: (payload = {}, id) => {
    return withAxios({ url: `/api/panel/withdrawals/${id}`, method: 'PUT', auth: true, formData: payload });
  },
  deleteWithdrawal: (id) => {
    return withAxios({ url: `/api/panel/withdrawals/${id}`, method: 'DELETE', auth: true});
  },
  withdrawalsInfo:() => {
    return withAxios({ url: `/api/panel/withdrawals/info`, method: 'GET', auth: true });
  },

  geTickets:(options = {}) => {
    return withAxios({ url: `/api/panel/tickets${objectToQueryString(options, { isEncoded: false })}`, method: 'GET', auth: true });
  },
  replyTeckets: ( id , payload = {}) => {
    return withAxios({ url: `/api/panel/tickets/${id}`, method: 'PUT', auth: true, formData: payload });
  },
  deleteTeckets: ( id) => {
    return withAxios({ url: `/api/panel/tickets/${id}`, method: 'DELETE', auth: true});
  },
  
};
