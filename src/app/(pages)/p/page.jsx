'use client';

import React, { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import * as Icons from '@/assets/icons';
export default function WhishlistPage() {
  const t = useTranslations();
  return (
    <section className='app-container relative my-9'>
      other pages
      <div className='w-4'>
        <Icons.EmptyWishlist  color='red'/>
      </div>
    </section>
  );
}
