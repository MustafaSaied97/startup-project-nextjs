'use client';
import React from 'react';
import { toggleTheme } from '@/lib/features/themeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useClient } from '@/hooks';
import * as Icon from '@/assets/icons';

export default function ThemeToggle() {
  const currentTheme = useSelector((state) => state.theme.currentTheme);
  const dispatch = useDispatch();
  const isClient = useClient();
  return (
    <>
      {isClient && (
        <button onClick={() => dispatch(toggleTheme())} className='m-0 p-0'>
          {currentTheme == 'light' ? <Icon.LightMode className='  inline h-5 w-5' /> : <Icon.DarkMode className='  inline h-5 w-5' />}
        </button>
      )}
    </>
  );
}
