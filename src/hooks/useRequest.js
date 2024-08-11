import React, { useEffect, useRef, useState } from 'react';
import { notify } from '@/utils';
import { useTranslations } from 'next-intl';
import useCachedState from '@/hooks/useCashedState';
const allQueryKeys = {};
export default function useRequest({
  queryFn = async () => {}, //api request
  queryKey = '', // if you want to caching the response
  isImmediate = true, // if you want to call api after componet is mounted
}) {
  const t = useTranslations();
  const [cachedData, setCachedData] = useCachedState(queryKey, null);
  const [resData, setResData] = useState(cachedData !== null ? cachedData : null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(cachedData !== null ? false : true);

  const fetchData = async (options) => {
    setIsLoading(true);
    try {
      const response = await queryFn(options);
      setResData(response);
      queryKey && setCachedData(response);
    } catch (error) {
      notify(error?.data?.message ?? t('general.err_msg'), { type: 'error' });
      setError(error);
    } finally {
      setIsLoading(false);
      // delete allQueryKeys[queryKey];
    }
  };

  useEffect(() => {
    (async () => {
      if (isImmediate) {
        //at component mounting call api request
        // Check if there is an ongoing request for the same queryKey
        !cachedData && fetchData();
        // !allQueryKeys[queryKey] && !cachedData && fetchData();
        // allQueryKeys[queryKey] = true;
      } else {
        setIsLoading(false);
      }
    })();
    // Cleanup function
    return () => {
      // Cancel request or perform any cleanup if needed
    };
  }, [queryKey]);

  return { resData, error, isLoading, fetchData };
}
