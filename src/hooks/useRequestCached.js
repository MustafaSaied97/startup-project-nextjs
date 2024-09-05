import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { notify } from '@/utils';
import { useTranslations } from 'next-intl';
import { requestCacheManager } from '@/utils/requestCacheManager';

const ongoingRequests = new Map();



export default function useRequest({ queryFn = async () => {}, queryKey = '', isImmediate = true }) {
// Singleton instance of the cache manager
  const cache = requestCacheManager.getInstance();
  
  const isCacheEnabled = Boolean(queryKey); // Check if caching is enabled
  const t = useTranslations();
  const [localResData, setLocalResData] = useState(isCacheEnabled ? cache.get(queryKey) : null); // Use cache data if available
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(!localResData);

  const fetchData = useCallback(
    async (options) => {
      setIsLoading(true);

      if (ongoingRequests.has(queryKey)) {
        const ongoingPromise = await ongoingRequests.get(queryKey);
        setLocalResData(ongoingPromise);
        return;
      }

      const requestPromise = queryFn(options)
        .then((response) => {
          setLocalResData(response); // Set local state if caching is not enabled
          cache.set(queryKey, response); // Cache the response
          ongoingRequests.delete(queryKey);
          return response;
        })
        .catch((error) => {
          notify(error?.data?.message ?? t('general.err_msg'), { type: 'error' });
          setError(error);
          ongoingRequests.delete(queryKey);
          return Promise.reject(error);
        })
        .finally(() => {
          setIsLoading(false);
        });

      ongoingRequests.set(queryKey, requestPromise);

      return requestPromise;
    },
    [queryFn, queryKey, t]
  );

  useEffect(() => {
    if (isImmediate && !localResData) {
      fetchData(); // Fetch data immediately if required and not already cached
    }
  }, [fetchData, isImmediate, localResData]);

  return {
    resData: localResData,
    error,
    isLoading,
    fetchData,
  };
}
