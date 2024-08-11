'use client';

import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWishlistId, toggleWishlistProduct } from '@/lib/features/wishlistSlice';
import { FilledHeartIcon, WishlistIcon } from '@/assets/icons/components';
import { notify } from '@/utils';
import { useTranslations } from 'next-intl';
import { websiteApis } from '@/services/apis';

export default function WishlistBtn({ id = '', productData = {} }) {
  const wishlistIds = useSelector((state) => state.wishlist.wishlistIds);
  const [isProcessing, setIsProcessing] = useState(false);
  const t = useTranslations();
  const dispatch = useDispatch();
  const isAddedToWishlist = useMemo(() => wishlistIds.includes(productData?.id), [wishlistIds]);

  const handleToggleWishlist = async ({ newState }) => {
    if (!productData?.id) return;
    const payloadData = {
      product_id: productData?.id,
    };
    setIsProcessing(true);
    //change UI
    dispatch(toggleWishlistId(productData?.id));
    dispatch(toggleWishlistProduct(productData));
    try {
      isAddedToWishlist ? await websiteApis.removeFromWishlist(productData?.id) : await websiteApis.addToWishlist(payloadData);
    } catch (err) {
      //revert UI
      dispatch(toggleWishlistId(productData?.id));
      dispatch(toggleWishlistProduct(productData));
      notify(err?.message || err?.data?.message, { type: 'error' });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <p id={id} onClick={() => handleToggleWishlist({ newState: !isAddedToWishlist })} className='m-0 p-0'>
      {isAddedToWishlist ? <FilledHeartIcon width={19} height={19} /> : <WishlistIcon color='gray' />}
    </p>
  );
}
