'use client';
import { Link, usePathname } from '@/navigation';
import DropdownUser from './DropdownUser';
import Image from 'next/image';
import { BurgerIcon, BurgerCloseIcon, UserIcon, MenuIcon, WishlistIcon, CartIcon, StoreIcon, LightModeIcon, ArrowIcon } from '@/assets/icons/components';
import { LocaleSwitcher, ThemeToggle } from '@/components';

import React, { useEffect, useState, useMemo } from 'react';
import { useRouter } from '@/navigation';
import { useSelector } from 'react-redux';

const Header = ({ setSidebarOpen, sidebarOpen }) => {
    const currentTheme = useSelector((state) => state.theme.currentTheme);

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  return (
    <header id='panel-header' className='flex  min-h-[--panel-header-height] w-full items-center justify-between border-b border-gray-200 bg-[--panel-bg-2] p-3 dark:border-gray-700'>
      <div className='flex items-center gap-2 sm:gap-4 '>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className='' type='button'>
          {sidebarOpen ? <BurgerCloseIcon /> : <BurgerIcon />}
        </button>

        <Link className='block flex-shrink-0 ' href='/'>
          <Image width={32} height={32} src={`/assets/icons/main-logo-${currentTheme}.png`} alt='Logo' />
        </Link>
      </div>

      {/* <div className=' gap-3 bg-slate-400'>user</div> */}
      <div className='flex items-center justify-between gap-4'>
        <LocaleSwitcher />
        <button className='flex  border-gray-200  '>
          <ThemeToggle />
        </button>

        {/* <div tabIndex={-1} onBlur={() => setIsSettingsOpen(false)} className='relative m-0 flex h-fit p-0'>
          <button onClick={() => setIsSettingsOpen(true)} className=''>
            <UserIcon className='ms-2  inline h-5 w-5' />
          </button>

          {isSettingsOpen && (
            <ul className={`absolute ${isSettingsOpen ? 'end-0 top-0' : ''} z-10 w-44 divide-y  divide-gray-100 rounded-lg bg-white py-2 text-sm shadow`}>
              <li className={`m-1 cursor-pointer rounded-lg px-2 py-1  hover:bg-slate-100 `}>
                <button onMouseDown={() => router.replace('/profile')} className={` ${pathname == '/profile' ? 'text-red-500' : ''} `}>
                  Profile
                </button>
              </li>
              <li className={`m-1 cursor-pointer rounded-lg px-2 py-1  hover:bg-slate-100 `}>
                <button onMouseDown={() => router.replace('/order-history')} className={` ${pathname == '/order-history' ? 'text-red-500' : ''} `}>
                  Order History
                </button>
              </li>
              <li className={`m-1 cursor-pointer rounded-lg px-2 py-1  hover:bg-slate-100 `}>
                <button onMouseDown={() => router.replace('/referrals')} className={` ${pathname == '/referrals' ? 'text-red-500' : ''} `}>
                  Referrals
                </button>
              </li>
              <li className={`m-1 cursor-pointer rounded-lg px-2 py-1  hover:bg-slate-100 `}>Log Out</li>
            </ul>
          )}
        </div> */}
      </div>
    </header>
  );
};

export default Header;
