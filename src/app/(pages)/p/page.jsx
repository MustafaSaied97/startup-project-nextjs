'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import * as Icons from '@/assets/icons';
import FormModal from './FormModal';
import FormComponent from './FormComponent';
import useRequest from '@/hooks/useRequest';
import { apis } from '@/services/apis';
export default function WhishlistPage() {
  const t = useTranslations();
  const { resData: req1 } = useRequest({ queryFn: apis.getCountries, queryKey: 'getCountries' });
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
