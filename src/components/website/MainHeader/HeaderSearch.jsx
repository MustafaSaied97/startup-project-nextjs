'use client';
import React, { useState } from 'react';
import * as Icon from '@/assets/icons';
import { useQuery } from '@/hooks';
import { debounceFunc } from '@/utils';

export default function HeaderSearch() {
  const query = useQuery();
  const [searchInput, setSearchInput] = useState(query.get('search') ?? '');

  const onChangeSearch = (e) => {
    const searchValue = e.target.value;
    setSearchInput(searchValue);
    if (searchValue.trim() === '') {
      query.delete('search');
      query.addToUrl();
      return;
    }
    debounceFunc(() => {
      query.set('search', encodeURIComponent(searchValue));
      query.addToUrl();
    }, 1)();
  };

  const handleSubmitSearch = (e) => {
    e?.preventDefault();
    if (!searchInput.trim()) return;
    query.set('search', encodeURIComponent(searchInput));
    query.addToUrl();
  };

  return (
    <form onSubmit={handleSubmitSearch} className='order-last flex min-w-[238px] max-w-[820px] flex-1  sm:order-none  lg:ps-32'>
      <input
        onChange={onChangeSearch}
        value={searchInput}
        type='search'
        className='w-full rounded-s-[5px]  border border-e-0 border-gray-300 bg-white px-3 py-2.5 text-black outline-none dark:bg-[#1d2023] dark:text-white xl:px-4 2xl:px-5 '
      />
      <button type='submit' className='w-[50px] rounded-e-[5px]  border  border-s-0 border-gray-300 bg-[--sec-bg] p-2.5 text-sm text-gray-900 '>
        <Icon.Search />
      </button>
    </form>
  );
}
