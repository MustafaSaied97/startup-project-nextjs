'use client';
import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import { LogoutModal } from '@/components/generic';

export default function MainHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      {isModalOpen && <LogoutModal closeModal={() => setIsModalOpen(false)} />}

      <header className='h-min-[--main-header-height] relative z-50  '>
        <NavBar openLogoutModal={() => setIsModalOpen(true)} />
      </header>
    </>
  );
}
