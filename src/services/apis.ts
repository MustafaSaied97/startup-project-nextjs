import { withAxios } from './requestFn/clientRequest';
import { objectToQueryString } from '@/utils';
type Options = Record<string, any>;
type Response<T> = Promise<T>;
type ApiRequestType<T> = (options: Options) => Response<T>;
type Apis<T> = Record<string, ApiRequestType<T>>;
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
  getProducts: (options = {}) => {
    return withAxios({ url: `/api/products${objectToQueryString(options, { isEncoded: false })}`, method: 'GET' });
  },
};



