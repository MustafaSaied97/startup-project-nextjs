'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import * as Icons from '@/assets/icons';
import FormModal from './FormModal';
import FormComponent from './FormComponent';
import useRequest from '@/hooks/useRequest';
import useRequestCached from '@/hooks/useRequestCached';
import { apis } from '@/services/apis';
export default function WhishlistPage() {
  const t = useTranslations();
  // const { resData: req1 } = useRequest({ queryFn: apis.getCountries, queryKey: 'getCountries' });
  const { resData: req1 } = useRequestCached({ queryFn: apis.getCountries, queryKey: 'getCountries' });
  const { resData: req2 } = useRequestCached({ queryFn: apis.getCountries, queryKey: 'getCountries' });
  const { resData: req3 } = useRequestCached({ queryFn: apis.getCountries, queryKey: 'getCountries' });
  const { resData: req4 } = useRequestCached({ queryFn: apis.getCountries, queryKey: 'getCountries' });
  const { resData: req5 } = useRequestCached({ queryFn: apis.getCountries, queryKey: 'getCountries' });
  const { resData: req6 } = useRequestCached({ queryFn: apis.getCountries, queryKey: 'getCountries' });
  console.table([req1, req2, req3, req4, req5, req6]);

  return (
    <section className='app-container relative my-9'>
      other pages
      <div className='w-4'>
        <Icons.EmptyWishlist color='red' />
      </div>
      <FormModal />
      <FormComponent />
    </section>
  );
}
