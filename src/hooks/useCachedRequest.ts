import React, { useEffect, useState, useCallback } from 'react';
import { notify } from '@/utils';
import { useTranslations } from 'next-intl';
import { requestCacheManager } from '@/utils/requestCacheManager';

const ongoingRequests = new Map();

// Singleton instance of the cache manager
const cache = requestCacheManager.getInstance();

export default function useCachedRequest({ queryFn = async () => {}, queryKey = '', isImmediate = true }) {
  const isCacheEnabled = Boolean(queryKey); // Check if caching is enabled
  const t = useTranslations();
  const [localResData, setLocalResData] = useState(isCacheEnabled ? cache.get(queryKey) : null); // Use cache data if available
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(!localResData);

  const fetchData =  async (options, append = false, appendedArrKey = 'data') => {
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

          setLocalResData(response); // Set local state with new data
          cache.set(queryKey, response); // Cache the response
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
    },

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
