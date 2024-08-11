'use client';
import React, { useEffect } from 'react';
import { MainHeader, MainFooter } from '@/components';
import { useDispatch } from 'react-redux';
import { resetWishlist, getAllWishlistIds } from '@/lib/features/wishlistSlice';
import { resetCart, getAllProductCartIds } from '@/lib/features/cartSlice';
import { useSelector } from 'react-redux';

export default function DefaultWebsiteLayout({ children }) {
  const dispatch = useDispatch();
  const { token: isAuthenticated, isMemberInWebsite } = useSelector((state) => state.auth.authData);

  useEffect(() => {
    if (isAuthenticated && isMemberInWebsite) {
      dispatch(getAllWishlistIds());
      dispatch(getAllProductCartIds());
    } else {
      dispatch(resetWishlist());
      dispatch(resetCart());
    }
  }, [isAuthenticated]);
  return (
    <section className='bg-[--pr-bg] text-[--pr-text]'>
      <MainHeader />
      <main className={`min-h-[--main-content-height]`}>{children}</main>
      <MainFooter />
    </section>
  );
}
