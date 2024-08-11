'use client';
import React, { useState, ReactNode } from 'react';
import Sidebar from '@/components/panel/Sidebar/index';
import Header from '@/components/panel/Header/index';
import PanelFooter from '@/components/panel/PanelFooter';

export default function DefaultPanelLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className='relative flex h-screen  flex-col '>
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <main className='flex overflow-x-auto overflow-y-hidden'>
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <section className='w-full overflow-y-auto'>
          <div className=' min-h-[--panel-content-height]  bg-[--panel-bg] p-4 md:p-6 2xl:p-10'>{children}</div>
          <PanelFooter/>
        </section>
      </main>
    </div>
  );
}
