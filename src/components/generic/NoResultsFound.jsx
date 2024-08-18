'use client';
import { useTranslations } from 'next-intl';
import React, { useState, useRef } from 'react';
import noResultsFoundImg from '@/assets/images/no-results-found.png';
export default function NoResultsFound({ message, imgSrc }) {
  const t = useTranslations();
  return (
    <div className='flex h-full w-full flex-col items-center justify-center'>
      <img src={imgSrc || noResultsFoundImg.src} className='w-full max-w-[400px] ' alt='' />
      <p className='-mt-6 text-base font-bold text-slate-400 sm:text-lg lg:text-2xl'>{message ?? t('general.no_results_found')}</p>
    </div>
  );
}
