'use client';
import React from 'react';
import { useTranslations } from 'next-intl';
import paymentStatusSvg from '@/assets/icons/payment-status.svg';
import { ROUTES_PATH, formatNumber } from '@/utils';
import { useSearchParams } from 'next/navigation';
import moment from 'moment';
//?order_id=155288&date=17 Jan, 2021&status=completed&total=0.00000000
export default function PaymentStatusPage() {
  const t = useTranslations();
  const searchParams = useSearchParams();
  return (
    <section className=' text-[var(--pr-text)] mx-auto flex min-h-screen items-center bg-[var(--pr-bg)] px-6 py-12  '>
      <div className=' mx-auto flex w-[90%] max-w-[565px]  flex-col items-center rounded-lg  p-7 text-center shadow-lg'>
        <header className='flex w-full flex-col items-center   rounded-t   border-b border-dashed border-gray-300 pb-5 '>
          <figure className=' w-full'>
            <img src={paymentStatusSvg.src} className='mx-auto max-w-[200px]' alt='' />
            <p className=' flex items-center justify-between'>
              <span>{t('general.order_id')}</span>
              <span>#{searchParams.get('order_id')}</span>
            </p>
          </figure>
        </header>
        <main className='relative flex w-full flex-auto flex-col items-center  border-b  border-dashed py-5'>
          <h3 className='text-center font-medium  sm:text-xl'>{t('general.thank_you')}</h3>
          <h3 className='text-center font-medium  sm:text-xl '>{t('general.order_received')}</h3>
          <section className='mt-3 flex w-full flex-col gap-4 text-gray-700 dark:text-gray-400'>
            <p className='flex w-full items-center justify-between'>
              <span>{t('general.order_placed_date')}</span>
              <span className='text-slate-500'> {moment(searchParams.get('date')).format('DD MMM, YYYY')}</span>
            </p>
            <p className='flex w-full items-center justify-between'>
              <span>{t('general.status')}</span>
              <span className='font-semibold text-slate-500'>{searchParams.get('status')}</span>
            </p>
            <p className='flex w-full items-center justify-between'>
              <span>{t('general.total_price')}</span>
              <span>{formatNumber(searchParams.get('total')) || 0}</span>
            </p>
          </section>
        </main>
        <footer className='mt-4 flex items-center justify-between '>
          <a href={ROUTES_PATH.website.orderHistory} className='h-full  w-full text-center font-bold text-rose-600 hover:text-rose-400'>
            {t('general.view_order_history')}
          </a>
        </footer>
      </div>
    </section>
  );
}
