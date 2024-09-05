'use client';
import React, { useEffect, useRef, useState } from 'react';
import { apis } from '@/services/apis';
import { useTranslations } from 'next-intl';
import useCachedRequest from '@/hooks/useCachedRequest';
import useLocale from '@/hooks/useLocale';
export default function Groups() {
  const t = useTranslations();
  const { locale } = useLocale();
  const { resData, isLoading, fetchData } = useCachedRequest({ queryFn: apis.getGroups, queryKey: 'getGroups' });
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const loadMore = async () => {
    setIsLoadingMore(true);
    await fetchData({ page: resData.current_page + 1 });
    setIsLoadingMore(false);
  };
  if (isLoading && !isLoadingMore) {
    return <p className='text-2xl'>loading...</p>;
  }
  return (
    <section className='flex flex-col gap-y-5 divide-y-2'>
      {resData?.data?.map((group) => {
        return (
          <div key={group?.id}>
            <p className='text-lg'>key:{group?.id}</p>
            <p className='text-2xl'>title:{group?.[`name_${locale}`]}</p>
          </div>
        );
      })}
      {resData?.current_page < resData?.pages_total && (
        <button
          onClick={loadMore}
          className='mx-auto mt-7 flex w-fit items-center gap-1 rounded-md bg-[var(--primary-clr)] px-4 py-2 text-xs font-medium text-white sm:px-6 sm:py-3 sm:text-base'
        >
          {`load more`}
          {isLoadingMore && '...'}
        </button>
      )}
    </section>
  );
}
