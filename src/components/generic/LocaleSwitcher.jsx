'use client';
import * as Icons from '@/assets/icons';
import useLocale from '@/hooks/useLocale';
import { LOCALE_COOKIE_NAME, localeNames, locales } from '@/plugins/i18n.js';
import { useState } from 'react';
import { setCookies } from '@/utils/cookies-action';

export default function LocaleSwitcher() {
  const { locale } = useLocale();
  const [isOpen, setIsOpen] = useState(false);

  const switchLocale = (e) => {
    const newLocale = e.target.getAttribute('name');
    if (locale == newLocale) return;
    setCookies({ name: LOCALE_COOKIE_NAME, value: newLocale });
  };

  return (
    <div onBlur={() => setIsOpen(false)} className='relative w-fit'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='inline-flex w-full  items-center gap-1 rounded-lg  py-2.5 text-center text-lg text-[--pr-text]    lg:px-5 '
      >
        <Icons.Language />
        {/* <span className='hidden lg:inline'>{locale === 'en' ? 'ENG' : 'AR'}</span> */}
        <Icons.Arrow />
      </button>
      {isOpen && (
        <ul className='dark:bg-gray-700py-2 absolute z-10  w-44 divide-y divide-gray-100 rounded-lg bg-white text-sm text-black shadow '>
          {locales.map((loc) => (
            <li
              key={loc}
              name={loc}
              className={`m-1 cursor-pointer rounded-lg px-2 py-1  hover:bg-slate-100 ${loc == locale ? 'bg-slate-300' : ''}`}
              onMouseDown={switchLocale}
            >
              {localeNames[loc]}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
