'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import * as Icons from '@/assets/icons';
import FormModal from './FormModal';
import FormComponent from './FormComponent';
export default function WhishlistPage() {
  const t = useTranslations();
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
