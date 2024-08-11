'use client';

import React, { useState } from 'react';
import { AddToCartIcon } from '@/assets/icons/components';
import { useTranslations } from 'next-intl';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/lib/features/cartSlice';
import { notify } from '@/utils';
import { websiteApis } from '@/services/apis';
export default function CartBtn({ isAvailable = true, productId, productQuantity = 1 }) {
  const t = useTranslations();
  const [isProcessing, setIsProcessing] = useState(false);
  const dispatch = useDispatch();
  const handleAddToCart = async () => {
    if (!productId || isProcessing || !isAvailable) return;
    const payloadData = {
      product_id: productId,
      quantity: productQuantity,
    };
    setIsProcessing(true);
    try {
      await websiteApis.addToCart(payloadData);
      dispatch(addToCart(productId));
      notify(t('general.add_to_cart'), { type: 'success', icon: () => <AddToCartIcon /> });
    } catch (err) {
      notify(err?.message || err?.data?.message, { type: 'error' });
    } finally {
      setIsProcessing(false);
    }
  };
  return (
    <p onClick={handleAddToCart} className='m-0 grid h-full w-full place-items-center p-0'>
      <AddToCartIcon />
    </p>
  );
}
