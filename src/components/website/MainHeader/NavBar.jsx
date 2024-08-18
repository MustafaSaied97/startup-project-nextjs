'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import * as Icon from '@/assets/icons';
import { LocaleSwitcher, LogoutModal, ThemeToggle } from '@/components';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/navigation';
import { useSelector } from 'react-redux';
import { useRouter } from '@/navigation';

import HeaderSearch from './HeaderSearch';
import { ROUTES_PATH } from '@/utils';

export default function NavBar1({ openMenu, openLogoutModal }) {
  const t = useTranslations();
  const currentTheme = useSelector((state) => state.theme.currentTheme);
  const layoutData = useSelector((state) => state.layout.layoutData);

  const { token: isAuthenticated, role, has_store, isMemberInWebsite } = useSelector((state) => state.auth.authData);
  const router = useRouter();
  const pathname = usePathname();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const dropDownPages = [
    { name: t('general.profile'), path: ROUTES_PATH.website.profile },
    { name: t('general.order_history'), path: ROUTES_PATH.website.orderHistory },
    { name: t('general.referrals'), path: ROUTES_PATH.website.referrals },
  ];
  return (
    <nav className='app-container flex min-h-[80px] w-full  flex-wrap items-center  justify-between  gap-3  bg-white py-2 shadow-md transition-all duration-200 dark:bg-[#1d2023] lg:shadow-none '>
      <button className='block lg:hidden' onClick={openMenu}>
        <Icon.Burger />
      </button>
      <Link href={ROUTES_PATH.website.home}>
        <Image src={layoutData?.style?.logo || `/assets/images/main-logo-${currentTheme}.png`} className='w-[30px] sm:w-[79px]' width={79} height={65} alt='test' />
      </Link>
      <HeaderSearch />
      <section className=' flex items-center justify-between gap-4'>
        <LocaleSwitcher />
        <button className={`flex border-e-2 border-gray-200 pe-3 ps-2`}>
          <ThemeToggle />
        </button>
        <div tabIndex={-1} onBlur={() => setIsSettingsOpen(false)} className='relative m-0 hidden h-fit p-0 lg:block'>
          <button onClick={() => setIsSettingsOpen(!isSettingsOpen)} className=''>
            <Icon.User className='ms-2  inline h-5 w-5' />
          </button>
          {isSettingsOpen && (
            <ul className={`absolute ${isSettingsOpen ? 'left-[-1.75rem]' : 'left-0'} z-10 w-44 divide-gray-100  divide-gray-600/20 rounded-lg bg-[var(--quat-bg)] py-2 text-sm shadow `}>
              {dropDownPages.map((page, index) => (
                <li key={index} className={`m-1 cursor-pointer rounded-lg px-2 py-1  hover:bg-slate-300/20  `}>
                  <button onMouseDown={() => router.replace(page.path)} className={` ${pathname == page.path ? 'text-red-500' : ''} `}>
                    {page.name}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <p>{isAuthenticated ? <LogoutModal /> : <Link href={ROUTES_PATH.website.login}>{'login'}</Link>}</p>
      </section>
    </nav>
  );
}
