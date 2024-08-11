'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function DefaultFormLayout({ children }) {
  const t = useTranslations();
  return (
    <section className=' flex min-h-screen bg-[--pr-bg] text-[--pr-text]  '>
      {/* <picture className='h-full w-full bg-cover bg-repeat-round ' style={{ backgroundImage: `url(${bg.src})` }}> */}
      <picture className='sticky top-0 hidden h-screen w-full max-w-[900px] md:block'>
        <Image priority src={`/assets/icons/form-img.png`} className='absolute  inset-0  z-0 h-screen w-full rtl:scale-x-[-1]' width={900} height={65} alt='test' />
        <section className='absolute inset-0 z-10 h-screen w-full  text-white'>
          <div className='mx-auto mt-[80%] flex w-[80%] flex-col items-center justify-center gap-4 md:mt-[70%]'>
            <Image src={`/assets/icons/main-logo.png`} className='' width={132} height={68.9} alt='test' />
            <h4 className=' text-center text-2xl font-bold text-white'>{t('general.layout_title')}</h4>
            <p className=' text-center text-white'>{t('general.layout_hint')}</p>
          </div>
        </section>
      </picture>

      <div className='   flex w-full overflow-y-auto   px-[20px] sm:px-[80px]'>{children}</div>
    </section>
  );
}
