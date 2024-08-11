'use client';
import React from 'react';
import { toggleTheme } from '@/lib/features/themeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { LightModeIcon, DarkModeIcon } from '@/assets/icons/components';

export default function ThemeToggle() {
  const currentTheme = useSelector((state) => state.theme.currentTheme);
  const dispatch = useDispatch();
  return (
    <i onClick={() => dispatch(toggleTheme())} className='m-0 p-0'>
      {currentTheme == 'light' ? <LightModeIcon className='  inline h-5 w-5' /> : <DarkModeIcon className='  inline h-5 w-5' />}
    </i>
  );
}
