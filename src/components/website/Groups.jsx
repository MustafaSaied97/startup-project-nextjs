'use client';
import React from 'react';
import { apis } from '@/services/apis';
import { useTranslations } from 'next-intl';
import useCachedRequest from '@/hooks/useCachedRequest';
import useLocale from '@/hooks/useLocale';
import { LoadMoreButton } from '../ui';
export default function Groups() {
  const t = useTranslations();
  const { locale } = useLocale();
  const { resData: groupsRes, isLoading, fetchData } = useCachedRequest({ queryFn: apis.getGroups, queryKey: 'getGroups' });

  const loadMore = async () => {
    await fetchData({ page: groupsRes.current_page + 1 }, true); // Pass `append` as `true` to append data
  };

  if (isLoading && !groupsRes) {
    return <p className='text-2xl'>loading...</p>;
  }
  return (
    <section className='flex flex-col gap-y-5 divide-y-2'>
      {groupsRes?.data?.map((group) => {
        return (
          <div key={group?.id}>
            <p className='text-lg'>key:{group?.id}</p>
            <p className='text-2xl'>title:{group?.[`name_${locale}`]}</p>
          </div>
        );
      })}
      <LoadMoreButton
        currentPage
        totalPages
        onLoadMore={loadMore}
        hasMore={groupsRes?.current_page < groupsRes?.pages_total}
        buttonText={t('general.load_more')}
      />
    </section>
  );
}
