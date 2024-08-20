'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import * as Icons from '@/assets/icons';
import { DropdownList, LocaleSwitcher, LogoutModal, ThemeToggle } from '@/components';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/navigation';
import { useSelector } from 'react-redux';
import { useRouter } from '@/navigation';

import HeaderSearch from './HeaderSearch';
import { ROUTES_PATH } from '@/utils';

export default function NavBar1() {
  const t = useTranslations();
  const currentTheme = useSelector((state) => state.theme.currentTheme);
  const layoutData = useSelector((state) => state.layout.layoutData);

  const router = useRouter();
  const pathname = usePathname();
  const dropDownPages = [
    { name: 'order_history', path: ROUTES_PATH?.website?.orderHistory },
    { name: 'referrals', path: ROUTES_PATH?.website?.referrals },
  ];
  return (
    <nav className='app-container flex min-h-[80px] w-full  flex-wrap items-center  justify-between  gap-3  bg-white py-2 shadow-md transition-all duration-200 dark:bg-[#1d2023] lg:shadow-none '>
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
            <button onClick={toggle} className='m-0! p-0! h-full'>
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
                    <button onMouseDown={() => {}} className={` ${pathname == page.path ? 'text-red-500' : ''} `}>
                      {page.name}
                    </button>
                  </li>
                ))}
              </ul>
            )
          }
        />
      </section>
    </nav>
  );
}
