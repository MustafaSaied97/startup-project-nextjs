// app/_components/LocaleSwitcher.tsx
'use client';
import React, { useEffect, useState } from 'react';

import { usePathname, useRouter } from '@/navigation';
import { SearchIcon } from '@/assets/icons/components';
import { useSearchParams } from 'next/navigation';
import { debounceFunc } from '@/utils';
import { ROUTES_PATH } from '@/utils';

export default function HeaderSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  // const queryParams = new URLSearchParams(searchParams.toString());//if you want to append to current queries string
  const queryParams = new URLSearchParams(); //if you dont  want to append to current queries string
  const [searchInput, setSearchInput] = useState(searchParams.get('search') ?? '');
  const pathname = usePathname();

  const onChangeSearch = (e) => {
    setSearchInput(e.target.value);
    if (e.target.value.trim() === '') {
      //remove search query if emplty input
      queryParams.delete('search');
      //if my curret path in product so change in query string
      pathname == ROUTES_PATH.website.products && router.push(`${ROUTES_PATH.website.products}?${queryParams.toString()}`);
    }
  };

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    queryParams.set('search', encodeURIComponent(searchInput));
    router.push(`${ROUTES_PATH.website.products}?${queryParams.toString()}`);
  };
  
  useEffect(() => {
    if (pathname == ROUTES_PATH.website.products && !searchParams.get('search')) {
      //if my curret path in products page and no search in query string clear search input
      setSearchInput('');
    }
  }, [pathname, searchParams]);

  return (
    <form onSubmit={handleSubmitSearch} className='order-last flex min-w-[238px] max-w-[820px] flex-1  sm:order-none  lg:ps-32'>
      <input
        onChange={onChangeSearch}
        value={searchInput}
        type='search'
        className='w-full rounded-s-[5px]  border border-e-0 border-gray-300 bg-white px-3 py-2.5 text-black outline-none dark:bg-[#1d2023] dark:text-white xl:px-4 2xl:px-5 '
      />
      <button type='submit' className='w-[50px] rounded-e-[5px]  border  border-s-0 border-gray-300 bg-[--sec-bg] p-2.5 text-sm text-gray-900 '>
        <SearchIcon />
      </button>
    </form>
  );
}
