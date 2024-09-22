import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getCookie } from 'cookies-next';
import { setCookies, deleteCookies } from '@/utils/cookies-action';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

// axiosInstance.interceptors.request.use(
//   (config) => {
//     console.log('config', config);
//     return config;
//   },
//   (error) => {
//     let res = error.response;
//     if (res.status == 401) {
//       window.location.href = 'https://example.com/login';
//     }
//     return Promise.reject(error);
//   }
// );
// axiosInstance.interceptors.response.use(
//   (response) => {
//     console.log('response', response);
//     return response;
//   },
//   (error) => {
//     let res = error.response;
//     if (res.status == 401) {
//       window.location.href = 'https://example.com/login';
//     }
//     console.error('Looks like there was a problem. Status Code: ' + res.status);
//     return Promise.reject(error);
//   }
// );
type WithAxiosParams = {
  auth?: boolean; // Optional
  method: string;
  url: string;
  formData?: Record<string, any>; // Allow any shape for formData
  withFiles?: boolean;
  arrayBufferResponse?: boolean;
  abortControllerSignal?: AbortSignal | null;
  [key: string]: any; // Allow additional parameters
};
export async function withAxios({
  auth = false,
  method,
  url,
  formData = {},
  withFiles = false,
  arrayBufferResponse = false,
  abortControllerSignal = null,
}: WithAxiosParams): Promise<any> {
  if (!url || !method) {
    console.error('Both the URL and the method must be provided.');
    return Promise.reject({ message: 'Both the URL and the method must be provided.' });
  }
  // check network
  if (!navigator.onLine) {
    console.error('you are not online please check your network');
    return Promise.reject({ message: 'you are not online please check your network' });
  }

  let AccessTokens: string | null = null;
  if (auth) {
    //1- get token from cookies
    AccessTokens = JSON.parse(getCookie('authData') || '{}')?.token;
    //if not exist --->
    // handleNotAuthorized();

    //2- check if it expired or not
    //if expired --> send endpoint refresh token
  }

  const domainName = window?.location?.host || '';

  return axiosInstance({
    method,
    timeout: 60000,
    url,
    ...(formData && { data: formData }),
    ...(arrayBufferResponse && { responseType: 'arraybuffer' }), //for downloading excel of pdf file
    headers: {
      'X-Frontend-Domain': domainName,
      Accept: 'application/json',
      Platform: 'web',
      'Content-Type': withFiles ? 'multipart/form-data' : 'application/json', //for uplading images,videos,audios
      'Accept-Language': getCookie('NEXT_LOCALE') ?? 'en',
      ...(AccessTokens && { Authorization: `Bearer ${AccessTokens}` }),
    },
    ...(abortControllerSignal && { signal: abortControllerSignal }), // for cancelling the request
  })
    .then((res: AxiosResponse) => res.data)
    .catch((err) => {
      if (axios.isCancel(err)) {
        // request was intercepted by a signal cancellation
        return;
      }
      const errorObj = err.response;
      console.error('errorObj>>', errorObj);
      switch (errorObj?.status) {
        case 401: {
          handleNotAuthorized();
          break;
        }
        default:
          () => {};
      }
      return Promise.reject(errorObj || {});
    });
}
const handleNotAuthorized = () => {
  //reset data of user
  deleteCookies({ name: 'authData' });
  //redirect to login or 401 page
  window.location.replace(`${window.origin}/login`);
};
