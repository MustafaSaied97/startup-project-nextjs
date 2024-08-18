import { getTranslations } from 'next-intl/server';
import React from 'react';

export default async function HomePage() {
  const t = await getTranslations();
  return <div className='app-container text relative my-9  py-9 text-[10px] font-bold text-blue-700'>{t('home')}</div>;
}
