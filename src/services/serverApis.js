import { makeServerRequest } from './requestFn/serverRequest';
import { cache } from 'react';

export const apis = {
  getLayout: async () => {
    // by wrapping calling api with cache function if  you call api multiple times it make request for one time and other will take it form cahced reponse
    return makeServerRequest({ url: `/api/layout`, method: 'GET' });
  },
  getHome: (options = {}) => {
    return makeServerRequest({ url: `/api/home`, method: 'GET' });
  },
};
