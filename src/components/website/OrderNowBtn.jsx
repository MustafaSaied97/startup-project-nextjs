'use client';

import React, { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { useSelector } from 'react-redux';
import { useRouter } from '@/navigation';
import { ROUTES_PATH } from '@/utils';
import { notify } from '@/utils';

export default function OrderNowBtn({ isFromCart = false, orders }) {
  const { token: isAuthenticated, isMemberInWebsite } = useSelector((state) => state.auth.authData);
  const t = useTranslations();
  const router = useRouter();

  const totalOrderPrice = useMemo(() => {
    const allTotalPrice = orders.reduce((accumulator, order) => accumulator + order.price * order.quantity, 0);
    return parseFloat(allTotalPrice).toFixed(2);
  }, [orders]);

  const handleAddToMakeOrder = () => {
    if (!isAuthenticated && !isMemberInWebsite) {
      notify(t('general.you_need_to_login_first'), { type: 'error' });
      router.push(ROUTES_PATH.website.login);
      return;
    }
    sessionStorage.setItem('ordersData', JSON.stringify({ isFromCart, orders, totalOrderPrice }));
    router.push(ROUTES_PATH.website.makeOrder);
  };
  return (
    <p onClick={handleAddToMakeOrder} className='m-0  grid h-full w-full place-items-center p-0'>
      {t('general.order_now')}
    </p>
  );
}
