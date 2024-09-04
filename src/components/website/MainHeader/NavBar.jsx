'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import * as Icons from '@/assets/icons';
import { DropdownList, LocaleSwitcher, LogoutModal, ThemeToggle } from '@/components';
import { useTranslations } from 'next-intl';
import { useSelector } from 'react-redux';

import HeaderSearch from './HeaderSearch';
import { ROUTES_PATH } from '@/utils';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function NavBar() {
  const t = useTranslations();
  const currentTheme = useSelector((state) => state.theme.currentTheme);
  const layoutData = useSelector((state) => state.layout.layoutData);

  const { token: isAuthenticated, role, has_store, isMemberInWebsite } = useSelector((state) => state.auth.authData);
  const pathname = usePathname();
  const dropDownPages = [
    { name: 'login', path: ROUTES_PATH?.website?.login },
    { name: 'order_history', path: ROUTES_PATH?.website?.orderHistory },
    { name: 'referrals', path: ROUTES_PATH?.website?.referrals },
  ];
  return (
    <nav className='app-container flex min-h-[80px] w-full  flex-wrap items-center  justify-between  gap-3  bg-[--tr-bg] py-2 shadow-md transition-all duration-200  lg:shadow-none '>
      <button className='block lg:hidden'>
        <Icons.Burger />
      </button>
      <Link href={ROUTES_PATH.website.home}>
        <Image
          src={layoutData?.style?.logo || `/assets/images/main-logo-${currentTheme}.png`}
          className='w-[30px] sm:w-[79px]'
          width={79}
          height={65}
          alt='test'
        />
      </Link>
      <HeaderSearch />
      <section className=' flex items-center justify-between gap-4'>
        <LocaleSwitcher />
        <ThemeToggle />

        <DropdownList
          Button={({ toggle }) => (
            <button onClick={toggle} className='m-0! h-full p-0!'>
              <Icons.User onClick={toggle} className='m-0  ms-2 inline h-6 w-5 p-0' />
            </button>
          )}
          List={({ isOpen }) =>
            isOpen && (
              <ul
                className={`absolute ${isOpen ? 'left-[-1.75rem]' : 'left-0'} z-10 w-44 divide-gray-100  divide-gray-600/20 rounded-lg bg-[var(--quat-bg)] py-2 text-sm shadow `}
              >
                {dropDownPages.map((page, index) => (
                  <li key={index} className={`m-1 cursor-pointer rounded-lg px-2 py-1  hover:bg-slate-300/20  `}>
                    <button onMouseDown={() => router.replace(page.path)} className={` ${pathname == page.path ? 'text-red-500' : ''} `}>
                      {page.name}
                    </button>
                  </li>
                ))}
              </ul>
            )
          }
        />
        {isAuthenticated ? <LogoutModal /> : <Link href={ROUTES_PATH.auth.login}>{'login'}</Link>}
      </section>
    </nav>
  );
}
