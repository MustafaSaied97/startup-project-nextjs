'use client';
import React from 'react';
import { MainHeader, MainFooter } from '@/components';

export default function DefaultWebsiteLayout({ children }) {
  return (
    <section className='bg-[--pr-bg] text-[--pr-text]'>
      <MainHeader />
      <main className={`min-h-[--main-content-height]`}>{children}</main>
      <MainFooter />
    </section>
  );
}
