import { Anchor, Dialog, Popover, GenericModal, Slider } from '@/components';
import Groups from '@/components/website/Groups';
import TableList from '@/components/website/TableList';
import AdvTableList from '@/components/website/AdvTableList';
import { getTranslations } from 'next-intl/server';
import React from 'react';

export default async function HomePage() {
  const t = await getTranslations();
  return (
    <div className='app-container text relative my-9  py-9 text-[10px] font-bold text-blue-700'>
      <section className='flex flex-col gap-4'>
        <Popover />
        <hr />
        <Dialog />
        <hr />
        <Anchor />
      </section>
      <hr className='mt-6' />
      <hr />

      <p className='text-xl font-thin'>{t('home')}thin</p>
      <p className='text-xl font-medium'>{t('home')}medium</p>
      <p className='text-xl font-semibold'>{t('home')}semibold</p>
      <p className='text-xl font-bold'>{t('home')}bold</p>
      <p className='text-xl font-[1000]'>{t('home')}extrabold</p>

      <GenericModal />
      <div className='mt-16'>
        <Slider />
      </div>
      <div className='mt-16'>
        AdvTableList****
        <AdvTableList />
      </div>
      <div className='mt-16'>
        TableList****
        <TableList />
      </div>
      <div className='mt-16'>
        Groups****
        <Groups />
      </div>
    </div>
  );
}
