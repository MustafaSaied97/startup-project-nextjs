'use client';

import React, { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { EmptyWishlistIcon } from '@/assets/icons/components';
import WishlistTable from './WishlistTable';
import { getWishlistProducts } from '@/lib/features/wishlistSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function WhishlistPage() {
  const t = useTranslations();
  const dispatch = useDispatch();
  const { wishlistProducts, isLoading } = useSelector((state) => state.wishlist);

  useEffect(() => {
    !wishlistProducts && dispatch(getWishlistProducts());
  }, []);

  if (wishlistProducts !== null && wishlistProducts?.length == 0 && !isLoading) {
    return (
      <section className='app-container relative my-9 grid min-h-[--main-content-height] place-items-center'>
        <figure className='flex flex-col items-center  justify-center gap-11'>
          <EmptyWishlistIcon />
          <figcaption className='mb-11 text-sm font-bold text-rose-500 xs:text-lg sm:text-2xl'>{t('general.your_wishlist_is_empty')}</figcaption>
        </figure>
      </section>
    );
  }

  return (
    <section className='app-container relative my-9'>
      <h1 className='relative mb-7 text-lg  font-semibold sm:text-xl md:text-[32px]'>
        {t('general.whishlist')}
        <p className=' absolute bottom-0   w-[54px] rounded-sm border border-rose-600 sm:-bottom-2 sm:border-2'></p>
      </h1>
      <p className='mb-11 text-sm font-normal text-slate-500 '>{t('general.whishlist_hint')}</p>
      <WishlistTable wishlistProducts={wishlistProducts} isLoading={isLoading} />
    </section>
  );
}
