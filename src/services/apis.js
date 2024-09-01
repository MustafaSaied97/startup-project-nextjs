import { withAxios } from './requestFn/clientRequest';
import { objectToQueryString } from '@/utils';

export const apis = {
  getHome: (options = {}) => {
    return withAxios({ url: `/api/home${objectToQueryString(options)}`, method: 'GET' });
  },
  getGroups: (options = {}) => {
    return withAxios({ url: `/api/groups${objectToQueryString(options)}`, method: 'GET' });
  },
  getCountries: () => {
    return withAxios({ url: `/api/countries`, method: 'GET' });
  },
};


