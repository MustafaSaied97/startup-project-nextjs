'use client';
import React from 'react';
import { PhoneIcon, EmailIcon } from '@/assets/icons/components';
import { useSelector } from 'react-redux';
import { useTranslations, useLocale } from 'next-intl';

export default function InfoBar() {
  const t = useTranslations();
  const locale = useLocale();
  const layoutData = useSelector((state) => state.layout.layoutData);
  return (
    <section className=' app-container responsive-text flex min-h-[40px] flex-wrap items-center  justify-center  gap-3  bg-[--sec-bg] py-2 text-white   md:justify-between  md:gap-3  '>
      <h3 className='text-center '>{t('general.welcome_msg', { website_name: layoutData?.meta?.[`meta_title_${locale}`] })}</h3>
      <div className='flex flex-wrap items-center justify-center gap-3 sm:justify-between sm:gap-20'>
        <p className='flex items-center  gap-1 '>
          <EmailIcon />
          {layoutData?.contacts?.email}
        </p>
        <p className='flex items-center gap-1'>
          <PhoneIcon /> {layoutData?.contacts?.phone}
        </p>
      </div>
    </section>
  );
}
