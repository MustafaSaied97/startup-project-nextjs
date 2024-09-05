'use client';
import React, { useEffect } from 'react';
import { apis } from '@/services/apis';
import { useTranslations } from 'next-intl';
import useCachedRequest from '@/hooks/useCachedRequest';
import useLocale from '@/hooks/useLocale';

import { useRouter, useSearchParams } from 'next/navigation';
import { Pagination } from '../ui';
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

  return (
    <>
      <section className='rounded-md border'>
        <table id='reponsive-table' className='w-full  text-xs sm:text-sm'>
          <thead className='border-b  text-sm font-medium'>
            <tr className=''>
              <th scope='col' className='inline-block px-6 py-3 text-start '>
                {t('general.order_id')}
              </th>
              <th scope='col' className='px-6 py-3'>
                {t('general.status')}
              </th>
              <th scope='col' className='px-6 py-3'>
                {t('general.date')}
              </th>
              <th scope='col' className='px-6 py-3'>
                {t('general.total')}
              </th>
              <th scope='col' className='px-6 py-3'>
                {t('general.quantity')}
              </th>
              <th scope='col' className='px-6 py-3'></th>
            </tr>
          </thead>
          <tbody className=''>
            {ProductsRes?.data?.map((product, index) => (
              <tr key={product.id} className='border-b !bg-transparent text-base last:border-0 sm:border-0' scope='row'>
                <td data-label={t('general.order_id')} className='table-lable px-6 py-4 text-center'>
                  <p>#{product?.id}</p>
                </td>
                <td data-label={t('general.status')} className={`table-lable px-6 py-4 text-center text-slate-500`}>
                  <p>{product?.[`name_${locale}`]}</p>
                </td>
                <td data-label={t('general.date')} className='table-lable  px-6 py-4 text-center text-slate-500'>
                  <p>{product?.date}</p>
                </td>
                <td data-label={t('general.total')} className='table-lable px-6 py-4 text-center text-slate-500'>
                  <p>
                    ${product?.total} ({product?.items?.length} {t('general.products')})
                  </p>
                </td>
                <td data-label={t('general.quantity')} className='table-lable px-6 py-4 text-center text-slate-500'>
                  <p>{product?.items}x</p>
                </td>
                <td className='px-6 py-4 text-center'></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
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
