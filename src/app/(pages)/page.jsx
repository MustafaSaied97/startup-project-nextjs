import { GenericModal, Slider } from '@/components';
import { getTranslations } from 'next-intl/server';
import React from 'react';

export default async function HomePage() {
  const t = await getTranslations();
  return (
    <div className='app-container text relative my-9  py-9 text-[10px] font-bold text-blue-700'>
      <p>{t('home')}</p>
      <GenericModal />
      <div className='mt-16'>

      <Slider />
      </div>
    </div>
  );
}
