'use client';
import React, { useState } from 'react';
import NavBar1 from './NavBar1';
import InfoBar from './InfoBar';
import useRequest from '@/hooks/useRequest';
import { websiteApis } from '@/services/apis';
import { LogoutModal } from '@/components';

export default function MainHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { resData: categoriesRes, isLoading } = useRequest({ queryFn: websiteApis.getCategories, queryKey: 'categoriesRequest' });
  const categories = categoriesRes?.data || [];

  return (
    <>
      {isModalOpen && <LogoutModal closeModal={() => setIsModalOpen(false)} />}

      <header className='h-min-[--main-header-height] relative z-50  '>
        <InfoBar />
        <NavBar1 openMenu={() => setIsMenuOpen(true)} openLogoutModal={() => setIsModalOpen(true)} />
      </header>
    </>
  );
}
