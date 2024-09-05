'use client';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

import React from 'react';

export default function Pagination({ currentPage = 1, totalPages = 1, onPageChange = (newPage) => {}, isBlockPageChange = false }) {
  const t = useTranslations();
  const [currentStep, setCurrentStep] = useState(currentPage);

  useEffect(() => {
    setCurrentStep(currentPage);
  }, [currentPage]);
  

  useEffect(() => {
    currentPage != currentStep && onPageChange(currentStep);
  }, [currentStep]);
  return (
    <section className='justify center mt-12 flex flex-col items-center justify-between gap-2 sm:flex-row'>
      <div className='mx-auto flex h-[40px] max-w-[155px] items-center justify-between gap-4 justify-self-center border-solid'>
        <button
          className='  grid h-full w-full place-items-center rounded-md border-2 border-[var(--primary-clr)] p-1 text-sm font-bold text-[var(--primary-clr)] hover:shadow-lg  dark:shadow-gray-900   sm:p-2 '
          type='button'
          disabled={currentStep == 1 || isBlockPageChange}
          onClick={() => setCurrentStep((prev) => --prev)}
        >
          {'<--'}
        </button>
        <button
          disabled={currentStep == totalPages || isBlockPageChange}
          className=' flex h-full  w-full items-center gap-2 whitespace-nowrap rounded-md  border-2   border-[var(--primary-clr)] bg-[var(--primary-clr)] p-1 text-xs font-bold text-white  hover:shadow-lg  dark:shadow-gray-900 sm:p-2   sm:text-sm '
          type='button'
          onClick={() => setCurrentStep((prev) => ++prev)}
        >
          {t('general.next_page')}
          {'-->'}
        </button>
      </div>
      <div className='flex items-center   gap-1 text-xs sm:text-sm'>
        <p>{t('general.page')}</p>
        <p className='h-7  w-12 rounded-md border p-[.2rem]'>{currentStep}</p>
        <p>
          {t('general.of')} {totalPages}
        </p>
      </div>
    </section>
  );
}
