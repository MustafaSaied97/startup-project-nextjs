// app/_components/LocaleSwitcher.tsx

'use client';
import { LanguageIcon, ArrowIcon } from '@/assets/icons/components';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/navigation';
import { localeNames, locales } from '@/plugins/i18n.js';

import { useState } from 'react';

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const switchLocale = (e) => {
    const newLocale = e.target.getAttribute('name');
    if (locale == newLocale) return 
    router.replace(pathName, { locale: newLocale }) 
    router.refresh()
  };
  

  return (
    <div onBlur={() => setIsOpen(false)} className='relative w-fit'>
      <button onClick={() => setIsOpen(!isOpen)} className='inline-flex w-full  items-center gap-1 rounded-lg  py-2.5 text-center text-lg text-[--pr-text]    lg:px-5 '>
        <LanguageIcon />
        <span className='hidden lg:inline'>{locale === 'en' ? 'ENG' : 'AR'}</span>
        {/* <svg className='ms-1 aspect-square w-3 text-gray-300' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 10 6'>
          <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m1 1 4 4 4-4' />
        </svg> */}
        <ArrowIcon />
      </button>
      {isOpen && (
        <ul className='dark:bg-gray-700py-2 absolute z-10  w-44 divide-y divide-gray-100 rounded-lg text-black bg-white text-sm shadow '>
          {locales.map((loc) => (
            <li key={loc} name={loc} className={`m-1 cursor-pointer rounded-lg px-2 py-1  hover:bg-slate-100 ${loc == locale ? 'bg-slate-300' : ''}`} onMouseDown={switchLocale}>
              {localeNames[loc]}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
