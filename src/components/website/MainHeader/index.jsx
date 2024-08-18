'use client';
import React, { useState } from 'react';
import NavBar from './NavBar';
import useRequest from '@/hooks/useRequest';
import { apis } from '@/services/apis';

export default function MainHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { resData: categoriesRes, isLoading } = useRequest({ queryFn: apis.getCategories, queryKey: 'categoriesRequest' });
  const categories = categoriesRes?.data || [];

  return (
    <>
      {isModalOpen && <LogoutModal closeModal={() => setIsModalOpen(false)} />}

      <header className='h-min-[--main-header-height] relative z-50  '>
        <NavBar openMenu={() => setIsMenuOpen(true)} openLogoutModal={() => setIsModalOpen(true)} />
      </header>
    </>
  );
}
