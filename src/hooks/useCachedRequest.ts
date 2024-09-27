import { useEffect, useState, useCallback } from 'react';
import { notify } from '@/utils';
import { useTranslations } from 'next-intl';
import { requestCacheManager } from '@/utils/requestCacheManager';

type FetchDataFn<T> = (options?: object, append?: boolean, appendedArrKey?: string) => Promise<T>;
type HookParams<T> = {
  queryFn: FetchDataFn<T>;
  queryKey?: string;
  isImmediate?: boolean;
};
interface DynamicObject {
  [key: string]: any; // or restrict it to arrays like: [key: string]: any[];
}
const ongoingRequests = new Map();
const cache = requestCacheManager.getInstance();

export default function useCachedRequest<T extends DynamicObject>({ queryFn, queryKey = '', isImmediate = true }: HookParams<T>) {
  const isCacheEnabled = Boolean(queryKey); // Check if caching is enabled
  const t = useTranslations();
  const [localResData, setLocalResData] = useState<T | null>(isCacheEnabled ? cache.get(queryKey) : null); // Use cache data if available
  const [error, setError] = useState<unknown>(null);
  const [isLoading, setIsLoading] = useState(!localResData);

  const fetchData: FetchDataFn<T> = async (options, append = false, appendedArrKey = 'data') => {
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
          // Ensure both the cachedArray and response[appendedArrKey] are arrays
          const cachedArray = Array.isArray(localResData?.[appendedArrKey]) ? localResData[appendedArrKey] : [];
          const responseArray = Array.isArray(response?.[appendedArrKey]) ? response[appendedArrKey] : [];
          // Append the arrays together
          (response as DynamicObject)[appendedArrKey] = [...cachedArray, ...responseArray];
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
