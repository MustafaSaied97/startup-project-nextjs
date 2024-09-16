import { useEffect, useState, useCallback } from 'react';
import { notify } from '@/utils';
import { useTranslations } from 'next-intl';
import { requestCacheManager } from '@/utils/requestCacheManager';

type Params = {
  queryFn: (options?: object) => Promise<any>;
  queryKey?: string;
  isImmediate?: boolean;
};
type FetchDataFn = (options?: object, append?: boolean, appendedArrKey?: string) => Promise<any>;

const ongoingRequests = new Map();
const cache = requestCacheManager.getInstance();

export default function useCachedRequest({ queryFn = async () => {}, queryKey = '', isImmediate = true }: Params) {
  const isCacheEnabled = Boolean(queryKey); // Check if caching is enabled
  const t = useTranslations();
  const [localResData, setLocalResData] = useState(isCacheEnabled ? cache.get(queryKey) : null); // Use cache data if available
  const [error, setError] = useState<unknown>(null);
  const [isLoading, setIsLoading] = useState(!localResData);

  const fetchData: FetchDataFn = async (options, append = false, appendedArrKey = 'data') => {
    setIsLoading(true);

    // If there's an ongoing request for this queryKey, await its promise and return the result
    if (ongoingRequests.has(queryKey)) {
      try {
        const ongoingPromise = await ongoingRequests.get(queryKey);
        return ongoingPromise; // Return the result from the ongoing promise
      } catch (err) {
        setIsLoading(false);
        setError(err);
        return Promise.reject(err);
      }
    }

    const requestPromise = queryFn(options)
      .then((response) => {
        // Append data if needed
        if (append && localResData) {
          response[appendedArrKey] = [...(localResData[appendedArrKey] || []), ...response[appendedArrKey]];
        }
        const formatedRes = { ...response, date: Date() };
        setLocalResData(formatedRes); // Set local state with new data
        cache.set(queryKey, formatedRes); // Cache the response
        ongoingRequests.delete(queryKey);
        return response; // Return the response for the fetchData call
      })
      .catch((error) => {
        notify(error?.data?.message ?? t('general.err_msg'), { type: 'error' });
        setError(error);
        ongoingRequests.delete(queryKey);
        return Promise.reject(error); // Return the error for the fetchData call
      })
      .finally(() => {
        setIsLoading(false);
      });

    ongoingRequests.set(queryKey, requestPromise);

    return requestPromise;
  };

  useEffect(() => {
    if (isImmediate && !localResData) fetchData();
  }, [fetchData, isImmediate, localResData]);

  return {
    resData: localResData,
    error,
    isLoading,
    fetchData,
  };
}
