import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { notify } from '@/utils';
import { useTranslations } from 'next-intl';
import { useDispatch, useSelector } from 'react-redux';
import { updateCachedState } from '@/state-mangement/features/cachedSlice';

const ongoingRequests = new Map();

export default function useRequest({ queryFn = async () => {}, queryKey = '', isImmediate = true }) {
  const isCacheEnabled = Boolean(queryKey);
  const t = useTranslations();
  const dispatch = useDispatch();
  const cachedResData = isCacheEnabled ? useSelector((state) => state.cached.cachedData[queryKey]) : null;
  const memoizedCachedResData = useMemo(() => cachedResData, [JSON.stringify(cachedResData)]);
  const [localResData, setLocalResData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(!memoizedCachedResData);

  const fetchData = useCallback(
    async (options) => {
      setIsLoading(true);

      if (ongoingRequests.has(queryKey)) {
        return ongoingRequests.get(queryKey);
      }
      const requestPromise = queryFn(options)
        .then((response) => {
          isCacheEnabled ? dispatch(updateCachedState({ key: queryKey, value: response })) : setLocalResData(response); // Update cache in Redux
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
    [queryFn, queryKey, dispatch, t]
  );

  useEffect(() => {
    if (isImmediate && !memoizedCachedResData) {
      fetchData();
    }
  }, [fetchData, isImmediate, memoizedCachedResData]);

  return {
    resData: isCacheEnabled ? memoizedCachedResData : localResData,
    error,
    isLoading,
    fetchData,
  };
}
