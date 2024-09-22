import { withAxios } from '@/services/requestFn/clientRequest';
import { objectToQueryString } from '@/utils';

export function getHome(options = {}) {
  return withAxios({ url: `/api/home${objectToQueryString(options)}`, method: 'GET' });
}
declare module '../'{
  export interface DataTypeRegistery {}

}