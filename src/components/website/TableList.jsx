'use client';
import React, { useEffect } from 'react';
import { apis } from '@/services/apis';
import { useTranslations } from 'next-intl';
import useCachedRequest from '@/hooks/useCachedRequest';
import useLocale from '@/hooks/useLocale';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button, Pagination, SimpleTable } from '../ui';
export default function TableList() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const t = useTranslations();
  const { locale } = useLocale();
  const { resData: ProductsRes, isLoading, fetchData } = useCachedRequest({ queryFn: apis.getProducts, queryKey: 'getProducts' });

  useEffect(() => {
    const currentPage = parseInt(searchParams.get('page') ?? 1);
    (!ProductsRes || currentPage != ProductsRes?.current_page) && fetchData({ page: currentPage });
  }, [searchParams, ProductsRes?.current_page]);

  const columns = [
    { key: 'order_id', header: t('general.order_id'), renderCell: (row) => `#${row.id}` },
    {
      key: 'name',
      header: t('general.status'),
      renderCell: (row) => <button className='rounded-md  bg-gray-400/20 p-1'>{row[`name_${locale}`]}</button>,
    },
    { key: 'date', header: t('general.date'), renderCell: (row) => row[`name_${locale}`] },
    { key: 'total', header: t('general.total'), renderCell: (row) => `$${row.total}` },
    { key: 'quantity', header: t('general.quantity'), renderCell: (row) => `x` },
  ];

  return (
    <>
      <SimpleTable columns={columns} data={ProductsRes?.data} isMobileHeader={false} />
      <Pagination
        currentPage={ProductsRes?.current_page}
        totalPages={ProductsRes?.pages_total}
        onPageChange={(newPage) => {
          router.push(`/?page=${newPage}`);
        }}
        isBlockPageChange={isLoading}
      />
    </>
  );
}
