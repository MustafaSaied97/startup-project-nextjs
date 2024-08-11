'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { BurgerIcon, LoginIcon, UserIcon, WishlistIcon, CartIcon, StoreIcon } from '@/assets/icons/components';
import { LocaleSwitcher, ThemeToggle } from '@/components';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/navigation';
import { useSelector } from 'react-redux';
import { useRouter } from '@/navigation';

import HeaderSearch from './HeaderSearch';
import { ROUTES_PATH } from '@/utils';

export default function NavBar1({ openMenu, openLogoutModal }) {
  const t = useTranslations();
  const currentTheme = useSelector((state) => state.theme.currentTheme);
  const wishlistIds = useSelector((state) => state.wishlist.wishlistIds);
  const layoutData = useSelector((state) => state.layout.layoutData);

  const productCartIds = useSelector((state) => state.cart.productCartIds);
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
        <BurgerIcon />
      </button>
      <Link href={ROUTES_PATH.website.home}>
        <Image src={layoutData?.style?.logo || `/assets/icons/main-logo-${currentTheme}.png`} className='w-[30px] sm:w-[79px]' width={79} height={65} alt='test' />
      </Link>
      <HeaderSearch />
      {/* [&>*:first-child]:border-none [&>*:last-child]:border-none [&>*]:border-e-2 */}
      <section className=' flex items-center justify-between gap-4'>
        <LocaleSwitcher />
        <button className={`flex border-e-2 border-gray-200 pe-3 ps-2`}>
          <ThemeToggle />
        </button>
        {isAuthenticated && isMemberInWebsite ? (
          <>
            <Link href={ROUTES_PATH.website.wishlist} className='flex border-e-2  border-gray-200 pe-3 text-[--pr-text]'>
              <span>{wishlistIds.length > 99 ? `99+` : wishlistIds.length}</span>
              <WishlistIcon className=' ms-2 inline h-5 w-5 ' color={pathname == ROUTES_PATH.website.wishlist ? 'red' : ''} />
            </Link>
            <Link href={ROUTES_PATH.website.cart} className='flex border-gray-200 pe-3 text-[--pr-text] lg:border-e-2 '>
              <span>{productCartIds.length > 99 ? `99+` : productCartIds.length}</span>
              <CartIcon className=' ms-2 inline h-5 w-5' color={pathname == ROUTES_PATH.website.cart ? 'red' : ''} />
            </Link>
            {role == 'reseller' && (
              <Link href={has_store ? ROUTES_PATH.panel.home : ROUTES_PATH.website.createStore} className=' hidden border-e-2  border-gray-200 pe-3 lg:block '>
                <StoreIcon className=' ms-2  inline h-5 w-5' color={pathname == ROUTES_PATH.website.createStore ? 'red' : ''} />
              </Link>
            )}
            <div tabIndex={-1} onBlur={() => setIsSettingsOpen(false)} className='relative m-0 hidden h-fit p-0 lg:block'>
              <button onClick={() => setIsSettingsOpen(!isSettingsOpen)} className=''>
                <UserIcon className='ms-2  inline h-5 w-5' />
              </button>
              {isSettingsOpen && (
                <ul className={`absolute ${isSettingsOpen ? 'left-[-1.75rem]' : 'left-0'} z-10 w-44 divide-y divide-gray-100  divide-gray-600/20 rounded-lg bg-[var(--quat-bg)] py-2 text-sm shadow `}>
                  {dropDownPages.map((page, index) => (
                    <li key={index} className={`m-1 cursor-pointer rounded-lg px-2 py-1  hover:bg-slate-300/20  `}>
                      <button onMouseDown={() => router.replace(page.path)} className={` ${pathname == page.path ? 'text-red-500' : ''} `}>
                        {page.name}
                      </button>
                    </li>
                  ))}
                  <li onMouseDown={openLogoutModal} className={`m-1 cursor-pointer rounded-lg px-2 py-1  hover:bg-slate-300/20  `}>
                    {t('general.logout')}
                  </li>
                </ul>
              )}
            </div>
          </>
        ) : (
          <Link href={ROUTES_PATH.website.login} className='border-gray-200 pe-3 '>
            <LoginIcon className=' ms-2  inline h-5 w-5' color={pathname == ROUTES_PATH.website.login ? 'red' : ''} />
          </Link>
        )}
      </section>
    </nav>
  );
}
