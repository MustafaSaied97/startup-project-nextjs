import { withAxios } from './requestFn/clientRequest';
import { objectToQueryString } from '@/utils';

export const apis = {
  getHome: (options = {}) => {
    return withAxios({ url: `/api/home${objectToQueryString(options)}`, method: 'GET' });
  },
  getGroups: (options = {}) => {
    return withAxios({ url: `/api/groups${objectToQueryString(options)}`, method: 'GET' });
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
  createStore: (payload = {}) => {
    return withAxios({ url: `/api/panel/stores`, method: 'POST', formData: payload, auth: true, withFiles: true }).then((res) => (res?.status ? res : Promise.reject(res)));
  },
  updateProfile: (payload = {}) => {
    return withAxios({ url: `/api/profile`, method: 'PUT', formData: payload, auth: true }).then((res) => (res?.status ? res : Promise.reject(res)));
  },
  changePassword: (payload = {}) => {
    return withAxios({ url: `/api/change-password`, method: 'POST', formData: payload, auth: true }).then((res) => (res?.status ? res : Promise.reject(res)));
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
};


