'use client';
import ProductsSection from './ProductsSection';
import React, { useEffect, useRef, useState } from 'react';
import { websiteApis } from '@/services/apis';
import { ROUTES_PATH, notify } from '@/utils';
import { useTranslations } from 'next-intl';
import { LoaderIcon } from '@/assets/icons/components';
import { Skeleton } from '@/components';
import useRequest from '@/hooks/useRequest';
import useCachedState from '@/hooks/useCashedState';
import { useLocale } from 'next-intl';
export default function HomeSections() {
  const t = useTranslations();
  const locale = useLocale();
  const [cachedRes, setCachedRes] = useCachedState('cachedRes', null);
  const { resData, isLoading, fetchData } = useRequest({ queryFn: websiteApis.getGroups, isImmediate: false });
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    !cachedRes && fetchData();
  }, []);

  useEffect(() => {
    let oldGroups = cachedRes?.data || [];
    let newGroups = resData?.data || [];
    resData &&
      setCachedRes({
        ...resData,
        data: [...oldGroups, ...newGroups],
      });
  }, [resData]);

  const loadMore = async () => {
    setIsLoadingMore(true);
    await fetchData({ page: cachedRes.current_page + 1 });
    setIsLoadingMore(false);
  };

  if (isLoading && !isLoadingMore) {
    return <Skeleton.HomeSections />;
  }

  return (
    <section className='flex flex-col'>
      {cachedRes?.data?.map((group) => {
        return <ProductsSection key={group?.id} title={group?.[`name_${locale}`]} url={`${ROUTES_PATH.website.products}?category_id=${group?.id}`} products={group?.products} />;
      })}
      {cachedRes?.current_page < cachedRes?.pages_total && (
        <button onClick={loadMore} className='mx-auto mt-7 flex w-fit items-center gap-1 rounded-md bg-rose-600 px-4 py-2 text-xs font-medium text-white sm:px-6 sm:py-3 sm:text-base'>
          {isLoadingMore && <LoaderIcon className='w-4 sm:w-6' />}
          {t('general.load_more')}
        </button>
      )}
    </section>
  );
}
